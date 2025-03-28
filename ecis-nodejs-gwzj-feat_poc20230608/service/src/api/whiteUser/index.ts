import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { arrToTree, deptMapping } from '../../util/index'
import { logger } from '../../server'
import { getNextDeptDataBase } from '../../model/openApi/fjdlAPI'
import { currentTime } from '../../util/momentTime'
const moment = require('moment')

/**
 * @path 获取白名单用户列表
 * @param {object} Context
 * @returns {object}
 */
export async function getWhiteUserSync(ctx: Context) {
  let res
  try {
    /* 查询中间表所有用户 */
    const SQLResult = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_white_users WHERE is_delete !=1',
      []
    )
    const SQLUserList =
        SQLResult.data &&
          SQLResult.data.rows &&
          Array.isArray(SQLResult.data.rows)
          ? SQLResult.data.rows
          : []
    if (SQLUserList.length === 0) {
      throw resErrJson('此白名单用户为空')
    } else {
      res = {
        result: 200,
        data: SQLUserList,
        msg: '获取数据成功'
      }
    }
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
  // ctx.body = aesEncryption(res)
  return ctx
}

/**
 * @path 查询白名单用户
 * @param {object} Context
 * @returns {object}
 */
export async function searchWhiteUser(ctx: Context) {
  let res
  try {
    const { name, userid } = ctx.query
    if (!name && !userid) {
      throw resErrJson('查询条件用户名和用户id都为空')
    } else {
      let SQLUserList: any
      if (name && userid) {
        /* 查询中间表所有用户 */
        const SQLResult = await sdkInstance.middleware.mysql.select(
          config.dbName,
          'SELECT * FROM middle_white_users WHERE is_delete !=1 AND nick_name=? AND user_id=?',
          [name, userid]
        )
        SQLUserList =
            SQLResult.data &&
              SQLResult.data.rows &&
              Array.isArray(SQLResult.data.rows)
              ? SQLResult.data.rows
              : []
      } else if (userid) {
        /* 查询中间表所有用户 */
        const SQLResult = await sdkInstance.middleware.mysql.select(
          config.dbName,
          'SELECT * FROM middle_white_users WHERE is_delete !=1 AND user_id=?',
          [userid]
        )
        SQLUserList =
            SQLResult.data &&
              SQLResult.data.rows &&
              Array.isArray(SQLResult.data.rows)
              ? SQLResult.data.rows
              : []
      } else if (name) {
        /* 查询中间表所有用户 */
        const SQLResult = await sdkInstance.middleware.mysql.select(
          config.dbName,
          'SELECT * FROM middle_white_users WHERE is_delete !=1 AND nick_name=?',
          [name]
        )
        SQLUserList =
            SQLResult.data &&
              SQLResult.data.rows &&
              Array.isArray(SQLResult.data.rows)
              ? SQLResult.data.rows
              : []
      }
      const serchData = SQLUserList
      res = {
        result: 200,
        data: serchData,
        msg: '成功'
      }
    }
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
  // ctx.body = aesEncryption(res)
  return ctx
}

/**
 * @path 新增白名单用户
 * @param {object} Context
 * @returns {object}
 */
export async function addWhiteUser(ctx: Context) {
  let res
  try {
    const { name, userid } = ctx.query
    if (!name && !userid) {
      throw resErrJson({
        msg: '用户名和用户id都为空'
      })
    } else {
      /* 查询中间表所有用户 */
      const SQLResult = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_white_users WHERE is_delete !=1 AND user_id=?',
        [userid]
      )
      const SQLUserList: any =
          SQLResult.data &&
            SQLResult.data.rows &&
            Array.isArray(SQLResult.data.rows)
            ? SQLResult.data.rows
            : []
      // eslint-disable-next-line eqeqeq
      if (!SQLUserList || SQLUserList.length == 0) {
        const time = await currentTime()
        // eslint-disable-next-line eqeqeq
        const insertMiddleUser = await sdkInstance.middleware.mysql.insert(
          config.dbName,
          'INSERT INTO middle_white_users (user_id, nick_name, create_time, update_time, is_delete) VALUES (?, ?, ?, ?, ?)',
          [
            userid,
            name,
            time,
            time,
            0
          ]
        )
        logger.info({ msg: `创建白名单成员-中间表:${userid},${name}` })
        /* 返回结果判断 */
        if (insertMiddleUser.result !== 'ok') {
          logger.warn({ msg: `新增白名单用户表失败,${userid},${name},insertMiddleUser: ${JSON.stringify(insertMiddleUser)}` })
          throw resErrJson({ msg: '新增白名单用户表失败' })
        }
      } else {
        logger.warn({ msg: `中间表用户已经存在！不能进行新建，userid： ${userid}， name: ${name}` })
        throw resErrJson({
          msg: '中间表用户已经存在！不能进行新建'
        })
      }
      res = {
        result: 200,
        msg: '添加成功'
      }
    }
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
  // ctx.body = aesEncryption(res)
  return ctx
}

/**
 * @path 修改白名单用户
 * @param {object} Context
 * @returns {object}
 */
export async function updataWhiteUser(ctx: Context) {
  let res
  try {
    const { name, userid, olduserid } = ctx.query
    if (!olduserid && (!name || !userid)) {
      throw resErrJson({
        msg: '用户名和用户id都为空'
      })
    } else {
      /* 查询中间表所有用户 */
      const SQLResult = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_white_users WHERE is_delete !=1 AND user_id=?',
        [olduserid]
      )
      const SQLUserList: any =
          SQLResult.data &&
            SQLResult.data.rows &&
            Array.isArray(SQLResult.data.rows)
            ? SQLResult.data.rows
            : []
      // eslint-disable-next-line eqeqeq
      if (!SQLUserList || SQLUserList.length == 0) {
        logger.warn({ msg: `中间表用户不存在！请先新建后重试，userid： ${userid}， name: ${name}` })
        throw resErrJson({
          msg: '中间表用户不存在！请先新建后重试'
        })
      } else {
        const upName = name || SQLUserList[0].nick_name
        const upUserid = userid || SQLUserList[0].userid
        const time = await currentTime()
        /* 更新用户表 */
        const updataMiddleUser = await sdkInstance.middleware.mysql.update(
          config.dbName,
          'UPDATE middle_white_users SET nick_name=?, update_time=?, user_id=? WHERE is_delete=0 AND user_id=?',
          [upName, time, upUserid, olduserid]
        )
        logger.info({ msg: `修改白名单成员－中间表:${upName}，${upUserid}` })
        /* 返回结果判断 */
        if (updataMiddleUser.result !== 'ok') {
          logger.warn({ msg: `更新白名单用户表失败,${upName}，${upUserid},updataMiddleUser: ${JSON.stringify(updataMiddleUser)}` })
          throw resErrJson({
            msg: '更新白名单用户表失败'
          })
        }
      }
      res = {
        result: 200,
        msg: '修改成功'
      }
    }
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
  // ctx.body = aesEncryption(res)
  return ctx
}

/**
 * @path 删除白名单用户
 * @param {object} Context
 * @returns {object}
 */
export async function delateWhiteUser(ctx: Context) {
  let res
  try {
    // const { useridData } = ctx.query
    // const delateData = ctx.request.body
    // const delateJsonArr: any = JSON.parse(delateData)
    // const useridList: any = delateJsonArr.useridData
    const delateData: any = ctx.request.body
    const useridList: any = delateData.useridData
    if (!useridList || useridList.length === 0) {
      throw resErrJson({
        msg: '用户列表都为空'
      })
    } else {
      for (const user of useridList) {
        /* 查询中间表所有用户 */
        const SQLResult = await sdkInstance.middleware.mysql.select(
          config.dbName,
          'SELECT * FROM middle_white_users WHERE is_delete !=1 AND user_id=?',
          [user.user_id]
        )
        const SQLUserList: any =
            SQLResult.data &&
              SQLResult.data.rows &&
              Array.isArray(SQLResult.data.rows)
              ? SQLResult.data.rows
              : []
        // eslint-disable-next-line eqeqeq
        if (!SQLUserList || SQLUserList.length == 0) {
          logger.warn({ msg: `中间表用户不存在！不能进行删除，userid： ${user.user_id}` })
          throw resErrJson({
            msg: '中间表用户不存在！不能进行删除'
          })
        } else {
          const time = await currentTime()
          /* 更新用户表 */
          const delMiddleUser = await sdkInstance.middleware.mysql.update(
            config.dbName,
            'UPDATE middle_white_users SET is_delete=1, update_time=? WHERE is_delete=0 AND user_id=?',
            [time, user.user_id]
          )
          logger.info({ msg: `删除白名单用户表-中间表:${user.user_id}` })
          /* 返回结果判断 */
          if (delMiddleUser.result !== 'ok') {
            logger.warn({ msg: `删除白名单用户表失败,user: ${user.user_id},delMiddleUser: ${JSON.stringify(delMiddleUser)}` })
          }
        }
      }
      res = {
        result: 200,
        msg: '成功'
      }
    }
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
  // ctx.body = aesEncryption(res)
  return ctx
}
/**
 * @path 删除白名单用户
 * @param {object} Context
 * @returns {object}
 */
export async function removeAllWhiteUser(ctx: Context) {
  let res
  try {
    const delDeptUser = await sdkInstance.middleware.mysql.delete(
      config.dbName,
      'DELETE FROM middle_white_users',
      []
    )
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
  // ctx.body = aesEncryption(res)
  return ctx
}
