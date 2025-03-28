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
  redirectAppid: string
  appKey: string
  dbName: string
  cid: string
  third: {
    domain: string
    clientId: string
    clientSecret: string
    systemId: string
    dataOriginUrl: string
    iscAppid: string
  }
  wechat: {
    thirdDomin: string,
    domain: string,
    corpid: string,
    agentId: string,
    corpsecret: string
    sm2PriKey: string
    sm2PubKey: string
    sm4Key: string
    iscAppId: string
  }
  department: {
    parentId: string
  }
  database: {
    host: string
    port: number
    database: string
    user: string
    password: string
    userSqlName: string
    deptSqlName: string
  }
  redis: {
    password: string,
    members: Array<{
      port: number
      host: string
    }>
  }
}

const config: Config = {
  port: process.env.HTTP_KPORT ? parseInt(process.env.HTTP_KPORT) : 8000,
  appid: process.env.AK,
  appkey: process.env.SK,
  grpc: {
    addr: process.env.GRPC_ADDR ? process.env.GRPC_ADDR : 'encs-pri-ecis:50051'
  },
  ecisHost: process.env.ECIS_HOST ? process.env.ECIS_HOST : 'http://encs-pri-cams-engine/i/encs-pri-ecis',

  // 本地环境
  // domain: 'http://172.21.131.95',
  // appID: 'AK20230613SGGZQC',
  // appKey: '8a639f2d356b7ec565c695061e210edc',

  // 测试环境
  // domain: 'http://172.23.0.45',
  // appID: 'AK20230627LPJKYL',
  // appKey: '81536c12169437acdcc8af08b02ef925',

  domain: 'http://172.23.0.45',
  appID: 'AK20230627LPJKYL',
  appKey: '81536c12169437acdcc8af08b02ef925',
  redirectAppid: process.env.REDIRECTAPPID,

  scope: 'corp_contacts_mgr',
  dbName: `ecis_plugins_${process.env.AK}`,
  // 组件id
  cid: 'gwzjaccount',
  // 第三方
  third: {
    clientSecret: 'duYh@rvt',
    domain: 'http://10.1.118.88:8090/isc_sso', //  三方域名 三方sso登录页面地址
    clientId: '10012', // 创建应用时统一权限管理员颁发（ISC数据库isc_application表CLIENT_ID字段） 单点需要
    systemId: '8a848277862b5959018827a993436c8a', // 业务应用ID  node未使用，对应jar包里的appid
    dataOriginUrl: 'http://172.23.0.45/c/gwzjaccountjava',
    iscAppid: '345a845d64ff47ad9edc510e957f2be9'
  },
  // 企业微信认证相关配置
  // 测试环境：thirdDomin: 'https://igw.isgcc.net:18443',
  // 生产环境：thirdDomin: 'https://id.sgcc.com.cn:10443/igwmobile'
  wechat: {
    thirdDomin: 'https://igw.isgcc.net:18443', // i国网接口地址
    domain: 'https://igw.isgcc.net:18081', // 跳转登录页面的地址
    corpid: 'ww445f8033443a14aa', // corpId 企信政务id
    agentId: '1009691', // 企信id 对应应用 AppId
    corpsecret: 'j5yWxK148Yc7PuH5_mLK5ICHqPkV4cp7kHzQSywFVWs', // 对应应用 Secret
    sm2PriKey: '0086EFF39A7E9E29C43E7CDCDE20FC5EB104B1C8E937C334837E6BC78631578F79', // sm2密钥 对应应用 signKey
    sm2PubKey: '04A1A064D213F3DA78B4D69E0E087B776C61BB110F7F6A22C73FA5102E59B32B7C10DBD32F527879652FBBB4E178DACA37E3C6FF97C2D7D8AC45023C1616BEE088', // sm2公钥 对应应用 signPublicKey
    sm4Key: '5d2aa0288a4b40e3928fec1c302ace60', // sm4密钥 对应应用 Isc Secret
    iscAppId: '345a845d64ff47ad9edc510e957f2be9', // Isc AppId 对应应用 Isc AppId
  },
  // 第三方根部门id
  department: {
    parentId: process.env.PARENTID ? process.env.PARENTID : '1'
  },
  database: {
    host: '172.19.239.6', // 172.19.238.54或者172.19.239.6
    port: 18600,
    database: 'wpszxwd',
    user: 'wpszxwd',
    password: '1qaz@WSX',
    userSqlName: 'ads_itg_m_isc_user',
    deptSqlName: 'ads_itg_t_isc_baseorg'
  },
  // redis: {
  //   // Kingsoft#831
  //   password: 'kQ#!@tHAkKp!2$Ry',
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
  // 客户环境
  redis: {
    password: 'kQ#!@tHAkKp!2$Ry',
    members: [{
      port: 8531,
      host: '172.23.0.45'
    }, {
      port: 8532,
      host: '172.23.0.45'
    }, {
      port: 8536,
      host: '172.23.0.45'
    }, {
      port: 8533,
      host: '172.23.0.45'
    }, {
      port: 8535,
      host: '172.23.0.45'
    }, {
      port: 8534,
      host: '172.23.0.45'
    }]
  }
}

export default config
