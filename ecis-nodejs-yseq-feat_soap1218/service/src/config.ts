import * as dotenv from 'dotenv'
import { StringSupportOption } from 'prettier'
dotenv.config()

interface wechat {
  AgentId: string
  corpid: string
  corpsecret: string
  mappingDomain: string
  domain: string
}

interface third {
  tim: {
    domain: string
    clientId: string
    clientSecret: string
    domainInner?: string
    domainOut?: string
  }
  wechat: wechat
}

interface Config {
  port: number
  appid: string
  appkey: string
  scope: string
  dbName: string
  grpc: {
    addr: string
  }
  redis: any
  ecisHost: string
  domain: string
  host?: string
  appID: string
  appKey: string
  componentId: string
  third: third
  timeoutStr: string
  timeoutFirst: string
  department: {
    parentId: string
    departmentId: string
  }
}

const config: Config = {
  port: process.env.HTTP_KPORT ? parseInt(process.env.HTTP_KPORT) : 8000,
  appid: process.env.AK,
  appkey: process.env.SK,
  grpc: {
    addr: process.env.GRPC_ADDR ? process.env.GRPC_ADDR : 'encs-pri-ecis:50051'
  },
  // redis: {
  //   password: 'kQ#!@tHAkKp!2$Ry',
  //   members: [{
  //     port: 8531,
  //     host: '10.145.145.6'
  //   }, {
  //     port: 8536,
  //     host: '10.145.145.6'
  //   }, {
  //     port: 8532,
  //     host: '10.145.145.7'
  //   }, {
  //     port: 8535,
  //     host: '10.145.145.8'
  //   }, {
  //     port: 8533,
  //     host: '10.145.145.8'
  //   }, {
  //     port: 8534,
  //     host: '10.145.145.7'
  //   }]
  // },
  redis: {
    password: 'Kingsoft#831',
    members: [{
      port: 8531,
      host: '10.145.146.84'
    }, {
      port: 8532,
      host: '10.145.146.85'
    }, {
      port: 8535,
      host: '10.145.146.86'
    }, {
      port: 8536,
      host: '10.145.146.84'
    }, {
      port: 8534,
      host: '10.145.146.85'
    }, {
      port: 8533,
      host: '10.145.146.86'
    }]
  },
  ecisHost: process.env.ECIS_HOST,
  scope: 'corp_contacts_mgr',
  dbName: 'ecis_plugins_ak20230129yseq',
  // 客户生产环境
  // host: 'http://10.145.3.236',
  domain: process.env.DOMAIN ? process.env.DOMAIN : 'https://wps.cctv.cn',
  appID: process.env.APPID ? process.env.APPID : 'AK20230107YOFJEX',
  appKey: process.env.APPKEY ? process.env.APPKEY : '9a9849b5cbe2e0e8294c9d96e505d337',
  timeoutStr: process.env.TIMEOUTSTR ? process.env.TIMEOUTSTR : '10000',
  timeoutFirst: process.env.TIMEOUTDFIRST ? process.env.TIMEOUTDFIRST : '5000',

  /** 客户poc环境 */
  // domain: 'https://wpsuat.cctv.cn',
  // host: 'http://10.145.145.6',
  // appID: 'AK20230614TPHHYH',
  // appKey: 'b9aa1a1174636df9263367acbb0b7eae',

  /** 内部测试环境 */
  // domain: 'https://klt.wpseco.cn',
  // appID: 'AK20230510CQSBLU',
  // appKey: 'ee6c107b7cc8cf925a31b8761642ce77',

  // 组件ID
  componentId: 'AKYSEQOAUTH',

  /** 客户生产环境 */
  third: {
    tim: {
      domain: process.env.TIMDOMAIN ? process.env.TIMDOMAIN : 'https://gcatam.cctv.com', //  三方域名
      clientId: process.env.TIMCLIENTID ? process.env.TIMCLIENTID : 'wps',
      clientSecret: process.env.TIMCLIENTSEC ? process.env.TIMCLIENTSEC : 'a788fe0e720f492fbde16102a85627e1',
      // domain: 'https://auth.cctv.com', // 可以在外网调用单点接口
      // clientSecret: '57307b08474e46ee8ffcb6ab012f96d2' // 可以在外网调用单点接口
    },
    wechat: {
      AgentId: process.env.AGENTID ? process.env.AGENTID : '1000113',
      corpid: process.env.CORPID ? process.env.CORPID : 'ww0e8b6b9048a35bd9',
      corpsecret: process.env.CORPSECRET ? process.env.CORPSECRET : 'm2j8aGqdsW4sbPEker_QKO-ZkC1JK-R-jl1pxDuGCec',
      mappingDomain: process.env.WETMAPDOMAIN ? process.env.WETMAPDOMAIN : 'https://wps.cctv.cn',
      domain: process.env.WETDOMAIN ? process.env.WETDOMAIN : 'https://qywx.cctv.com' // 企业微信接口
    }
  },

  /** 客户poc环境 */
  // third: {
  //   tim: {
  //     // domain: 'https://amtest.cctv.com',
  //     domain: 'http://gcatest.cctv.cn',
  //     domainInner: 'http://10.145.229.3:18080',
  //     // domainOut: 'http://10.145.11.148:18080',
  //     // domainOut: 'http://gcatest.cctv.cn',
  //     clientId: 'wpsuat',
  //     clientSecret: '19f6960e134c405ab888622600a10ebe'
  //   },
  //   wechat: {
  //     AgentId: '1000076',
  //     corpid: 'wwb9d601f103941f51',
  //     corpsecret: 'NpaygWUiPEoaO-j9TCt4xGVwvlucJcl6LJ8Y0yN45wQ',
  //     mappingDomain: 'https://wpsuat.cctv.cn',
  //     domain: 'http://10.145.2.236' // 企业微信接口测试地址
  //     // domain: 'https://qywxuat.cctv.com'
  //     // domain: 'https://api.jczxw.cn'
  //   }
  // },

  /** 内部测试环境 */
  // third: {
  //   tim: {
  //     domain: 'https://amtest.cctv.com',
  //     domainInner: 'http://10.145.229.3:18080',
  //     // domainOut: 'http://10.145.11.148:18080',
  //     domainOut: 'http://gcatest.cctv.cn',
  //     clientId: 'wpsuat',
  //     clientSecret: '19f6960e134c405ab888622600a10ebe'
  //   },
  //   wechat: {
  //     AgentId: '1000113',
  //     corpid: 'ww0e8b6b9048a35bd9',
  //     corpsecret: 'm2j8aGqdsW4sbPEker_QKO-ZkC1JK-R-jl1pxDuGCec',
  //     mappingDomain: 'https://klt.wpseco.cn',
  //     domain: 'https://qywx.cctv.com' // 企业微信接口
  //     // domain: 'https://api.jczxw.cn/mock/11/wps'
  //   }
  // },
  // 第三方根部门id
  /** 正式环境数据 */
  department: {
    parentId: process.env.PARENTID ? process.env.PARENTID : '0',
    departmentId: process.env.DEPMENTID ? process.env.DEPMENTID : '1'
  }
  /** 测试环境数据 */
  // department: {
  //   parentId: '1',
  //   departmentId: '20000270'
  // }
}

export default config
