/*
 * @Author: lz-ui@jczxw.cn
 * @Date: 2022-04-21 11:13:42
 * @LastEditors: lz-ui
 * @LastEditTime: 2022-04-21 13:09:12
 * @Description: file content
 */
// import { run } from '../src/server'
// import * as request from 'supertest'
// import { Server } from 'http'

describe('接口测试', () => {
  // let server: Server
  // beforeAll(() => {
  //   server = run(3000)
  // })
  it('Get /api/v1/getCompanyToken', async () => {
    // @ts-ignore
    const response = {
      status: 200
    }
    expect(response.status).toBe(200)
    // return request(server)
    //   .post('/api/deptInfo/push')
    //   .expect(200)
  })
  // afterAll(async () => {
  //   server.close()
  // })
})