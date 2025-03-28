import thirdUser from './thirdUser'
import * as xlsx from 'node-xlsx'
import moment = require('moment')
import { Context } from 'koa'
import { logger } from '../../server'
import { resErrJson, resJson } from '../../util/msgCode'
const fs = require('fs')

// excel
export async function makeExcel(ctx: Context) {
  let res
  try {
    logger.info('开始转换Excel')
    const userlist: any = thirdUser
    const resultInfo: any = [
      {
        name: 'firstSheet',
        data: []
      }
    ]
    for (const item of userlist.userList) {
      let deptName = ''
      if (item.depts.length > 0) {
        for (const deptItem of item.depts) {
          if (!deptName) {
            deptName = deptItem.name
          } else {
            deptName = deptName + ',' + deptItem.name
          }
        }
      }
      let creatTime: any = ''
      if (item.ctime) {
        creatTime = moment(item.ctime * 1000).format('YYYY-MM-DD HH:mm:ss')
      }
      const excelItem = [
        item.name,
        item.third_union_id,
        deptName,
        creatTime,
        item.status
      ]
      resultInfo[0].data.push(excelItem)
    }
    console.log(resultInfo)
    fs.writeFileSync('./thirdUser.xlsx', xlsx.build(resultInfo), 'binary')
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    logger.info('失败', e)
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 返回数据 */
  ctx.body = res
  // ctx.body = aesEncryption(res)
  return ctx
}
