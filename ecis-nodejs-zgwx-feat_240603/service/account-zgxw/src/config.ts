import * as dotenv from 'dotenv'
dotenv.config()

interface Config {
  port: number
  appid: string
  appkey: string
  domain: string
  scope: string
  appID: string
  appKey: string
  dbName: string
  third: {
    loginId: string
    loginSecret: string
    domain: string
    clientId: string
    clientSecret: string
    loginDomain: string
  }
  rdjcDbName: string
  wpsDbName: string
  department: {
    parentId: string
  }
  grpc: {
    addr: string
  }
  database: {
    host: string
    port: number
    database: string
    user: string
    password: string
  }
  mastedata:{
    maDomain: string
    orgSysCode: string
    orgGdBode: string
    orgToken: string
    userSysCode: string
    userGdCode: string
    userToken: string
  }
}

const config: Config = {
  port: process.env.port ? parseInt(process.env.port) : 8000,
  appid: process.env.APPID,
  appkey: process.env.APPKEY,

  // 生产环境
  // domain: 'https://pan.chinasatnet.com.cn',
  // appID: 'AK20230411IIJAYN',
  // appKey: 'd1a9ab3c0bcaf22b312fe209a6ea13e3',

  // 测试环境
  // domain: 'http://10.2.128.27',
  // appID: 'AK20230328RWAUGJ',
  // appKey: '81d7af3b6932755e84b252653fb7bcfe',

  // 本地环境
  domain: 'http://172.21.131.78',
  appID: 'AK20240606ARMKYR',
  appKey: '35346130413688d425716fb2ae24ca1d',

  // 环境
  // domain: 'http://10.2.128.27',
  // appID: 'AK20230328RWAUGJ',
  // appKey: '81d7af3b6932755e84b252653fb7bcfe',

  scope: 'corp_contacts_mgr',
  dbName: `ecis_plugins_${process.env.APPID}`,
  // 第三方
  third: {
    // 测试环境：
    // domain: 'https://idaas-sy.chinasatnet.com.cn',
    // clientId: 'd30b40082333448f98c75f4d68ce94f4',
    // clientSecret: '52b3ffba2ef4428e9c7933a18453afb0',
    // loginId: '274342374980550656',
    // loginSecret: 'bfdc10ddabf541a189226b4458701763',
    // loginDomain: 'https://sso-sy.chinasatnet.com.cn'
    // 生产环境：
    domain: 'https://idaas-new.chinasatnet.com.cn',
    clientId: 'eb7fddba59904c99bb4b6a6cc3586caa',
    clientSecret: 'fdc40c7da9234999b4878b5118eb0944',
    loginId: '274351119757914112',
    loginSecret: 'bf6258deedf949d580b790a191095b59',
    loginDomain: 'https://sso-new.chinasatnet.com.cn'
    // 预上线
    // domain: 'https://idaas-ver.chinasatnet.com.cn', //  三方域名
    // clientId: 'eb7fddba59904c99bb4b6a6cc3586caa',
    // clientSecret: 'fdc40c7da9234999b4878b5118eb0944',
    // loginId: '274351119757914112',
    // loginSecret: 'bf6258deedf949d580b790a191095b59',
    // loginDomain: 'https://sso-ver.chinasatnet.com.cn'
    // domain: 'https://idaas-sy.chinasatnet.com.cn',
    // clientId: 'd30b40082333448f98c75f4d68ce94f4',
    // clientSecret: '52b3ffba2ef4428e9c7933a18453afb0',
    // loginId: '274342374980550656',
    // loginSecret: 'bfdc10ddabf541a189226b4458701763',
    // loginDomain: 'https://sso-sy.chinasatnet.com.cn'
  },
  mastedata: {
    // 测试环境
    // maDomain: 'http://10.2.128.16',
    // orgSysCode: 'js_org',
    // orgGdBode: 'orginfo',
    // orgToken: '61910a16-55aa-4c3c-a076-db7839ed2e81',
    // userSysCode: 'js_emp',
    // userGdCode: 'empbaseinfo',
    // userToken: '8b47868b-49fb-4fcc-afee-4df3e19c20b3'

    // 生产环境
    maDomain: 'http://10.2.97.214',
    orgSysCode: 'ywd_org',
    orgGdBode: 'orginfo',
    orgToken: '75dc28f9-10be-4790-a642-f20222250e49',
    userSysCode: 'ywd_emp',
    userGdCode: 'empbaseinfo',
    userToken: 'b2332a99-05bc-4652-ab4a-dd8b770c4529'
  },
  rdjcDbName: 'wpsdb',
  wpsDbName: 'wps_account_sync',
  // 第三方根部门id
  department: {
    parentId: '0'
  },
  // 线上环境   // 10.2.94.10
  // database: {
  //   host: '10.2.95.1',
  //   port: 54321,
  //   database: 'wpsdb',
  //   user: 'system',
  //   password: '12345678ab',
  // }
  // 测试环境
  // database: {
  // host: '10.2.128.27',
  // port: 54321,
  // database: 'wpsdb',
  // user: 'wpsuser',
  // password: 'kb@JcwM!d3',
  // }
  // 本地环境
  // database: {
  //   host: '172.21.131.84',
  //   port: 3306,
  //   database: 'ecis_plugins_AK2023031224TEST',
  //   user: 'wps',
  //   password: 'KSPrivate&2106',
  // },
  database: {
    host: '10.2.95.1',
    port: 54321,
    database: 'wpsdb',
    user: 'system',
    password: '12345678ab',
  },
  grpc: {
    addr: '172.21.131.78:30051'
    // process.env.GRPC_ADDR ? process.env.GRPC_ADDR : 'encs-pri-ecis:50051'
    // '172.21.131.78:30051'
  }
}

export default config
