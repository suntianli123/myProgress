import { Context } from 'koa'
import * as fs from 'fs'
import * as path from 'path'
import * as XLSX from 'xlsx'
import { logger } from '../../server'
import { resErrJson, resJson } from '../../util/msgCode'

/**
 * @param {Context} ctx
 * @returns filePath 文件上传后的绝对路径
 */
export function fileWriteStream(ctx: Context): Promise<string> {
  return new Promise((resolve, reject) => {
    /**
     * method: 'post'
     * ctx.request.files['文件名']
     * "koa-body": "^4.2.0",
     * koaBody需开启表单上传文件开关 app.use(koaBody({ multipart: true }))
     */
    const file =
      !Array.isArray(ctx.request.files.file) && ctx.request.files.file
    logger.info(`文件大小:${file.size}`)
    const fileReader = fs.createReadStream(file.path)
    const filePath = path.join(__dirname, '../../public/temporary')
    // 拼接绝对路径
    const fileResource = filePath + `/${file.name}`
    /* 使用 createWriteStream 写入数据，然后使用管道流pipe拼接 */
    const writeStream = fs.createWriteStream(fileResource)
    // 判断 /static/upload 文件夹是否存在，不存在的话创建一个
    if (!fs.existsSync(filePath)) {
      fs.mkdir(filePath, (err: any) => {
        if (err) {
          reject(err)
        } else {
          fileReader
            .pipe(writeStream, { end: true })
            .on('finish', () => {
              resolve(fileResource)
            })
            .on('error', (err: any) => {
              reject(err)
            })
        }
      })
    } else {
      fileReader
        .pipe(writeStream, { end: true })
        .on('finish', () => {
          resolve(fileResource)
        })
        .on('error', (err: any) => {
          reject(err)
        })
    }
  })
}

/**
 *
 * @param filePath
 * @param sheetList
 * @param keep 保留上传后的文件 default:false
 * @example
 * ```ts
 * const result = loadDataFromExcel('../../public/temporary/用户.xlsx')
 * ```
 * @returns
 * ```ts
 *  {
 *    '用户': [...],
 *    '组织用户关系': [...]
 *  }
 * ```
 */
export function loadDataFromExcel(filePath: string, keep = false) {
  /**
   * XLSX.readFile()
   * NODE ONLY! Attempts to read filename and parse
   */
  const workbook = XLSX.readFile(filePath, { type: 'binary' })
  if (!keep) fs.unlink(filePath, () => {})
  const sheetNames = workbook.SheetNames
  // 工作表名称集合
  const draftObj: any = {}
  for (const sheet of sheetNames) {
    // 通过工作表名称来获取指定工作表
    const worksheet = workbook.Sheets[sheet]
    const header = Object.keys(worksheet).filter(
      // 筛选出 A1,B1,...,AA1等表头
      key =>
        key[key.length - 1] === '1' && /^\D$/.test(key[key.length - 2])
    )
    // 获取最大行数
    const rows = Math.max(
      ...header.map(head => {
        head = head.replace(/1/, '')
        return Object.keys(worksheet).filter(
          item => item.replace(/\d/g, '') === head
        ).length
      })
    )
    // 每个sheet页创建一个数组
    draftObj[sheet] = []
    // 从第二行开始依次遍历
    for (let i = 2; i <= rows; i++) {
      // 每行为一个对象
      const tempObj: any = {}
      // 遍历每个单元格
      header.forEach(head => {
        const key = head.slice(0, head.length - 1)
        if (worksheet[`${key}${i}`]) {
          tempObj[worksheet[`${key}1`].v] = worksheet[`${key}${i}`].v
        } else {
          // 单元格没有数据存为空字符
          tempObj[worksheet[`${key}1`].v] = ''
        }
      })
      draftObj[sheet].push(tempObj)
    }
  }
  return draftObj
}

/**
 *
 * @param draftObj
 * @param sheetList
 * ```ts
 * [
 *   { sheetName: '用户',
 *      option: {
 *        id: '标识',
 *        name: '用户姓名',
 *        login_name: '登录名'
 *        ...
 *      }
 *   },
 *   { sheetName: '组织用户关系', option: ... }
 * ]
 * ```
 * @returns draftObj
 */
export function mapDataExcelResult(
  draftObj: any,
  sheetList: Array<{ sheetName: string; option: { [key: string]: string } }>
) {
  const sheetNames = Object.keys(draftObj)
  for (const sheet of sheetList) {
    if (!sheetNames.some(sh => sh === sheet.sheetName)) {
      logger.error(`表格有误${sheet.sheetName}页不存在`)
      continue
    }
    // 根据每个sheet页对应的字段映射关系option处理数据
    draftObj[sheet.sheetName] = draftObj[sheet.sheetName].map((item: any) => {
      const keys = Object.keys(item)
      const resItem = JSON.parse(JSON.stringify(sheet.option))
      keys.forEach(key => {
        const head =
          resItem && Object.keys(resItem).find(opt => resItem[opt] === key)
        head && (resItem[head] = item[key])
      })
      return resItem
    })
  }
  return draftObj
}

export async function excelDemo(ctx: Context) {
  let res
  try {
    // 接收文件 返回文件路径
    const fileResource = await fileWriteStream(ctx)
    setTimeout(async () => {
      // 解析excel
      const excelData = loadDataFromExcel(fileResource)
      // 映射字段
      const mapData = mapDataExcelResult(excelData, [
        {
          sheetName: '组织机构',
          option: {
            id: '标识',
            parent: '父标识',
            name: '名称',
            status: '状态',
            sort: '排序号'
          }
        }
      ])
      let { 组织机构: deptList } = mapData
      deptList = deptList.map((dept: any) => ({
        ...dept,
        status: dept.status === '启用' ? 'ACTIVE' : 'LOCKED'
      }))
      // await syncDeptByExcel(deptList)
      logger.info('部门导入完成')
    }, 0)
    ctx.body = {
      url: fileResource,
      code: '1000',
      message: '上传成功，开始同步'
    }
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
    ctx.status = 200
    ctx.body = res
  }
  return ctx
}
