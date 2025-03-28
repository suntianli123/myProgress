import axios from 'axios'
import e = require('express')
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { logger } from '../../ins'
import { batchDisableCompanyUsers } from '../../model/openApi/company'
import { deptMapping, deptUpdataMap, userMap, userMapping, userUpdataMap } from '../../util'
import { currentTime } from '../../util/momentTime'
import { getCompanyToken } from '../authToken/func'
import { getAccessToken } from '../common'
import { handleDeptSync } from '../dept/dept'
import { handleUserSync } from '../user/user'
import { getAllDeptFromDB } from '../userinit'

export async function updateMessage(ctx: any) {
  logger.info(`webservice-body入参: ${JSON.stringify(ctx.request.body)}`)
  const bodyParam = ctx.request.body
  // const bodyParam = {
  //   envelope: {
  //     body: {
  //       wXnotify: {
  //         dn: '00213030',
  //         type: 'USER',
  //         operation: 'U'
  //       }
  //     }
  //   }
  // }
  // const bodyParam = {
  //   envelope: {
  //     body: {
  //       wXnotify: {
  //         dn: '10990000',
  //         type: 'OU',
  //         operation: 'D' // C：新增; U：更新; D：删除
  //       }
  //     }
  //   }
  // }
  // dn：工号或者部门编码,样例：00313403
  // type：USER：用户信息，ROLE：角色信息，OU：组织结构信息，TAG：标签
  // operation：C：新增，U：更新，D：删除
  let res: any
  try {
    let finishTip: any = 'OK'
    logger.info(`进入增量同步之前, ${bodyParam?.envelope?.body?.wXnotify?.type}`)
    if (bodyParam?.envelope && bodyParam?.envelope?.body && bodyParam?.envelope?.body?.wXnotify) {
      const updateInfo = bodyParam?.envelope?.body?.wXnotify
      if (!updateInfo.type) {
        finishTip = `FAIL 入参type为空 type值: ${updateInfo?.type}`
        logger.warn(`变更数据的异常, body: ${JSON.stringify(ctx.request.body)}`)
      } else if (!updateInfo.dn) {
        finishTip = `FAIL 入参dn为空 dn值: ${updateInfo?.dn}`
        logger.warn(`变更数据的异常, body: ${JSON.stringify(ctx.request.body)}`)
      } if (!updateInfo?.operation) {
        finishTip = `FAIL 入参operation不正确 operation值: ${updateInfo?.operation}`
        logger.warn(`变更数据的异常, body: ${JSON.stringify(ctx.request.body)}`)
      } else if (updateInfo?.type === 'USER') {
        logger.info(`人员同步, ${JSON.stringify(updateInfo)}`)
        updateUser(updateInfo)
      } else if (updateInfo?.type === 'OU') {
        logger.info(`部门同步, ${JSON.stringify(updateInfo)}`)
        updateDept(updateInfo)
      } else {
        finishTip = `FAIL 入参type不正确 type值: ${updateInfo.type}`
        logger.warn(`变更数据的异常, body: ${JSON.stringify(ctx.request.body)}`)
      }
    } else {
      finishTip = 'FAIL'
      logger.warn(`变更数据异常, body: ${JSON.stringify(ctx.request.body)}`)
    }
    res = {
      envelope: {
        header: null,
        body: {
          response: finishTip
        }
      }
    }
  } catch (e) {
    res = {
      envelope: {
        header: null,
        body: {
          response: 'FAIL'
        }
      }
    }
    logger.error(`接口异常, e: ${e}`)
  }

  ctx.status = 200
  ctx.body = res
  return ctx
}

export async function updateDept(deptParam: any) {
  // eslint-disable-next-line eqeqeq
  logger.info(`是否是删除: ${deptParam.operation} ${deptParam.operation != 'D'}`)
  if (deptParam.operation != 'D') {
    const accessToken = await getAccessToken()
    logger.info(`获取企微access_token: ${accessToken}, deptParam: ${JSON.stringify(deptParam)}`)
    // const thirdDeptUrl = `${config.third.wechat.domain}/cgi-bin/department/list?access_token=${accessToken}&id=${deptParam.dn}&no_fetch_child=0`
    // const deptRes = await axios.get(thirdDeptUrl)
    const deptRes = await thirdDept(deptParam, accessToken)
    logger.info(`企微获取部门详情接口,userRes-data: ${JSON.stringify(deptRes?.data)}`)
    const { errcode, department } = deptRes?.data || {}
    logger.info({
      msg: '三方部门数据量',
      data: JSON.stringify(deptRes?.data)
    })

    // eslint-disable-next-line eqeqeq
    if (errcode == '0' && department?.length > 0) {
      // eslint-disable-next-line eqeqeq
      department.forEach((item: any) => { item.status = deptParam?.operation == 'D' ? '2' : '1' })
      const deptList = await deptUpdataMap(department, {
        departmentId: 'id',
        parentId: 'parentid',
        department: 'name',
        order: 'order',
        status: 'status'
      })
      logger.info({
        msg: '字段转换后的部门数据',
        data: JSON.stringify(deptList)
      })
      await handleDeptSync(deptList)
    } else {
      logger.error({
        msg: '获取三方部门失败，返回值',
        data: deptRes?.data
      })
    }
  } else {
    // 删除部门，此时三方接口中已经无法查到部门信息
    const deptList = [{ departmentId: deptParam.dn, status: '2' }]
    logger.info({
      msg: '字段转换后的部门数据',
      data: JSON.stringify(deptList)
    })
    await handleDeptSync(deptList)
  }
}

export async function updateUser(userParam: any) {
  const accessToken = await getAccessToken()
  logger.info(`获取企微access_token: ${accessToken}, deptParam: ${JSON.stringify(userParam)}`)
  // const thirdUserUrl = `${config.third.wechat.domain}/cgi-bin/user/get?access_token=${accessToken}&userid=${userParam.dn}`
  const userRes: any = await thirdUser(userParam, accessToken)
  logger.info(`userRes企微人员接口响应值userRes: ${JSON.stringify(userRes?.data)}, deptParam: ${JSON.stringify(userParam)}`)
  // eslint-disable-next-line eqeqeq
  if (userRes?.data && userRes?.data?.errcode == '0' && userRes?.data?.userid) {
    // userRes.data.status = userParam.operation === 'D' ? '2' : '1'
    const userData = await getUserFormat([userRes?.data])
    logger.info(`企微读取成员转换后的数据,userData: ${JSON.stringify(userData)}`)
    await handleUserSync(userData)
  // eslint-disable-next-line eqeqeq
  } else if (userParam.operation == 'D') {
    // 删除用户，此时三方接口中已经无法查到用户信息，直接进行云文档禁用
    const userData: any = { id: userParam.dn }
    logger.info(`企微读取成员转换后的数据,userData: ${JSON.stringify(userData)}`)
    await handleUserDisable(userData) // 禁用
  } else {
    logger.error({
      msg: '获取三方用户失败，返回值',
      data: userRes?.data
    })
  }
}

export async function thirdUser(userParam: any, accessToken: any, againFlag?: any): Promise<any>  {
  return new Promise(async ( resolve, reject) => {
    setTimeout(async () =>{
      const thirdUserUrl = `${config.third.wechat.domain}/cgi-bin/user/get?access_token=${accessToken}&userid=${userParam.dn}`
      const userInfo = await axios.get(thirdUserUrl)
      logger.info(`企微读取成员接口, 是否再次请求againFlag: ${againFlag}, userRes-data: ${JSON.stringify(userInfo?.data)}`)
      if (!userInfo?.data || userInfo?.data?.errcode != '0') {
        setTimeout(async () => {
          const thirdUserAgain = `${config.third.wechat.domain}/cgi-bin/user/get?access_token=${accessToken}&userid=${userParam.dn}`
          const userInfoAgain = await axios.get(thirdUserAgain)
          // const userAgainInfo = await thirdUser(userParam, accessToken, 1)
          resolve(userInfoAgain)
        }, Number(config.timeoutStr))
      } else {
        resolve(userInfo)
      }
    }, Number(config.timeoutFirst))
  })
}

export async function thirdDept(deptParam: any, accessToken: any, againFlag?: any): Promise<any>  {
  return new Promise(async ( resolve, reject) => {
    setTimeout(async () =>{
      const thirdDeptUrl = `${config.third.wechat.domain}/cgi-bin/department/list?access_token=${accessToken}&id=${deptParam.dn}&no_fetch_child=0`
      const deptInfo = await axios.get(thirdDeptUrl)
      logger.info(`企微获取部门详情接口,是否再次请求againFlag: ${againFlag}, userRes-data: ${JSON.stringify(deptInfo?.data)}`)
      if (!deptInfo?.data || deptInfo?.data?.errcode != '0') {
        setTimeout(async () => {
          const deptAgainInfo = `${config.third.wechat.domain}/cgi-bin/department/list?access_token=${accessToken}&id=${deptParam.dn}&no_fetch_child=0`
          const deptDate = await axios.get(deptAgainInfo)       
          resolve(deptDate)
        }, Number(config.timeoutStr))
      } else {
        resolve(deptInfo)
      }
    }, Number(config.timeoutFirst))
    
  })
}

async function getUserFormat(userList: any) {
  const sqlDeptList = await getAllDeptFromDB()
  // logger.info(`所有部门数据,sqlDeptList: ${JSON.stringify(sqlDeptList)}`)
  for (const user of userList) {
    if (
      user.department.length
    ) {
      const dept = []
      for (const group of user.department) {
        const deptTemp = sqlDeptList.filter(
          // eslint-disable-next-line eqeqeq
          (sqlDept: any) => group == sqlDept.ori_dept_id
        )
        if (deptTemp.length !== 0) {
          for (const deptItem of deptTemp) {
            dept.push({
              ...deptItem,
              departmentId: deptItem.ori_dept_id
            })
          }
          user.dept = dept
        }
      }
    }
  }
  const userData = await userUpdataMap(userList, {
    id: 'userid',
    loginName: 'userid',
    name: 'name',
    status: 'status', // 是否需要禁用 1=已激活，2=已禁用，4=未激活
    order: 'order',
    dept: 'dept'
  })
  return userData
}

/* 禁用用户 */
async function handleUserDisable(user: any) {
  const SQLResult = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_users WHERE is_delete !=1 AND user_id=?',
    [user.id]
  )
  const SQLUserList =
    SQLResult.data &&
      SQLResult.data.rows &&
      Array.isArray(SQLResult.data.rows)
      ? SQLResult.data.rows
      : []
  logger.info({ msg: `三方接口无法查到用户时禁用用户表中数据长度:${SQLUserList.length}` })
  if (SQLUserList.length !== 0) {
    user.company_uid = SQLUserList[0].company_uid
    logger.info({ msg: `三方接口无法查到用户时禁用用户数据:${JSON.stringify(user)}` })
    /** 获取企业token */
    const companyToken = await getCompanyToken()
    const time = await currentTime()
    /* 禁用WPS企业用户 */
    const disableUserDept = await batchDisableCompanyUsers(
      companyToken,
      user.company_uid
    )
    logger.info({ msg: `禁用用户接口:${user.company_uid}` })
    /* 如果错误，抛出错误 */
    if (disableUserDept.result !== 0) {
      logger.warn({ msg: `禁用用户失败,user: ${JSON.stringify(user)},disableUserDept: ${JSON.stringify(disableUserDept)}` })
      return
    }
    /* 更新用户表 */
    const delMiddleUser = await sdkInstance.middleware.mysql.update(
      config.dbName,
      'UPDATE middle_users SET is_delete=2, update_time=? WHERE is_delete=0 AND company_uid=?',
      [time, user.company_uid]
    )
    logger.info({ msg: `禁用用户表-中间表:${user.company_uid}` })
    /* 返回结果判断 */
    if (delMiddleUser.result !== 'ok') {
      logger.warn({ msg: `用户表禁用修改失败,user: ${JSON.stringify(user)},delMiddleUser: ${JSON.stringify(delMiddleUser)}` })
    }
  } else {
    logger.warn({ msg: `用户不存在表中,user: ${JSON.stringify(user)},SQLUserList: ${JSON.stringify(SQLUserList)}` })
  }
}
