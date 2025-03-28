import * as dotenv from 'dotenv'
dotenv.config()

interface Config {
  port: number
  appid: string
  appkey: string
  grpc: {
    addr: string
  }
  ecisHost: string

  // 扩展字段
  domain: string
  scope: string
  appID: string
  appKey: string
  dbName: string
  metaAppId: string
  softwareFlag: string
  third: {
    loginDomain: string
    domain: string
    clientId: string
    clientSecret: string
    authorization: string
    thirdAuth:{
      domain: string
      flag: string
      userAgent: string
    },
    dmyAuth:{
      domain: string
      appId: string
      appSecret: string
      userAgent: string
      flag: string
    },
    bxyAuth:{
      domain: string
      userAgent: string
      flag: string
    }
  }
  department: {
    parentId: string
  }
  redis: {
    password: string,
    members: any[]
  }
}

const config: Config = {
  port: process.env.HTTP_KPORT ? parseInt(process.env.HTTP_KPORT) : 8000,
  appid: process.env.AK,
  appkey: process.env.SK,
  metaAppId: 'zzwjaccount',
  grpc: {
    addr: process.env.GRPC_ADDR ? process.env.GRPC_ADDR : 'encs-pri-ecis:50051'
  },
  ecisHost: process.env.ECIS_HOST ? process.env.ECIS_HOST : 'http://encs-pri-cams-engine/i/encs-pri-ecis',

  // domain: 'http://172.21.131.85',
  // appID: 'AK20230724DRSDDQ',
  // appKey: 'f1e36c371d22341eb604e472e4af7c55',
  // domain: 'http://113.0.44.11',
  // appID: 'AK20230215EEILGA',
  // appKey: '1955cf8d66ff416de0ccf9df72aeadf5',
  // 测试环境
  domain: process.env.DOMAIN ? process.env.DOMAIN : 'http://113.0.44.11',
  appID: process.env.OPENAPPID ? process.env.OPENAPPID : 'AK20230215EEILGA',
  appKey: process.env.OPENAPPKEY ? process.env.OPENAPPKEY : '1955cf8d66ff416de0ccf9df72aeadf5',

  scope: 'corp_contacts_mgr',
  dbName: `ecis_plugins_${process.env.AK}`,
  softwareFlag: process.env.SOFTFLAG ? process.env.SOFTFLAG : 'JHXZ-WDXT',  // 沈阳是：JHXZ-WDXT
  // 第三方
  third: {
    loginDomain: process.env.LOGINDOMAIN ? process.env.LOGINDOMAIN : 'http://109.202.104.5',
    // loginDomain: 'http://172.21.131.85',
    domain: process.env.THIRDDOMAIN ? process.env.THIRDDOMAIN : 'http://109.202.104.21:10002', //  三方域名
    clientId: process.env.CLIENTID ? process.env.CLIENTID : 'appywd',
    clientSecret: process.env.CLIENTSEC ? process.env.CLIENTSEC : 'duYh@rvt',
    authorization: process.env.AUTHTION ? process.env.AUTHTION : 'BearereyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhdXRoIiwiYXVkIjoiMTU1MDI5Njk3NjcyMzMxMkMwMiIsIklQIjoiMTg4Ljg4LjgwLjEzMSIsImlzcyI6ImNldGMxMCIsIkN1c3RvbUNsYWltcyI6eyJJUCI6IjE4OC44OC44MC4xMzEiLCJ1c2VyTmFtZSI6ImFkbWluIn0sImV4cCI6MTU2Mzg1MDEzNTE2OSwidXNlck5hbWUiOiJhZG1pbiIsImlhdCI6MTU2Mzg0MjkzNTE2OSwianRpIjoiMjAxOTA3MjMwODQ4NTUwMDAwMDEifQ.AYZx2MGh_MDTfj3SGTNlzTxsXU9gsVPWYt8IJPpLKnk',
    thirdAuth: {
      // 线上： http://109.201.0.193:10002
      // 测试： http://109.202.104.21:10002
      domain: process.env.AUTHDOMAIN ? process.env.AUTHDOMAIN : 'http://109.202.104.21:10002', // 三方-用户权限系统
      flag: 'THIRDAUTH-', // 内部区分标识
      userAgent: process.env.THIRDAGENT ? process.env.THIRDAGENT : 'thirdType', // 来源标识
    },
    dmyAuth: {
      domain: process.env.DMYDOMAIN ? process.env.DMYDOMAIN : 'http://47.96.254.180:8000', // 三方-大蚂蚁IM
      appId: process.env.DMYAPPID ? process.env.DMYAPPID : 'dmy_app_id', // 三方-大蚂蚁IM-接入商ID（在大蚂蚁平台申请得到）
      appSecret: process.env.DMYAPPSEC ? process.env.DMYAPPSEC : 'dmy_app_secret', // 三方-大蚂蚁IM-接入商密钥（在大蚂蚁平台申请得到）
      userAgent: process.env.DMYAGENT ? process.env.DMYAGENT : 'bigant', // 来源标识
      flag: 'DMY-' // 内部区分标识
    },
    bxyAuth: {
      domain: '', // 三方-北信源IM
      userAgent: process.env.BXYAGENT ? process.env.BXYAGENT : 'bxy', // 来源标识
      flag: 'BXY-' // 内部区分标识
    }
  },
  redis: {
    password: process.env.PASSWORD ? process.env.PASSWORD : 'Kingsoft#831',
    members: [{
      port: 8531,
      host: process.env.REDHOST1 ? process.env.REDHOST1 : '109.202.104.5'
    }, {
      port: 8533,
      host: process.env.REDHOST2 ? process.env.REDHOST2 : '109.202.104.5'
    }, {
      port: 8532,
      host: process.env.REDHOST3 ? process.env.REDHOST3 : '109.202.104.5'
    }, {
      port: 8534,
      host: process.env.REDHOST4 ? process.env.REDHOST4 : '109.202.104.5'
    }, {
      port: 8536,
      host: process.env.REDHOST5 ? process.env.REDHOST5 : '109.202.104.5'
    }, {
      port: 8535,
      host: process.env.REDHOST6 ? process.env.REDHOST6 : '109.202.104.5'
    }]
  },
  // redis: {
  //   // Kingsoft#831
  //   password: 'oNYthWlDInJDyj8R9Khq1DDUtQ8vd0z3',
  //   members: [{
  //     port: 8532,
  //     host: '172.21.131.85'
  //   }, {
  //     port: 8534,
  //     host: '172.21.131.85'
  //   }, {
  //     port: 8533,
  //     host: '172.21.131.85'
  //   }, {
  //     port: 8535,
  //     host: '172.21.131.85'
  //   }, {
  //     port: 8531,
  //     host: '172.21.131.85'
  //   }, {
  //     port: 8536,
  //     host: '172.21.131.85'
  //   }]
  // },
  // 第三方根部门id
  department: {
    parentId: 'allPidroot'
  },
}

export default config
