/* eslint-disable camelcase */
import { getCompanyToken } from '../authToken/func'
import { deptsList, getCompanyUsers } from '../../model/openApi/company'

/** 获取全部部门 */
export async function getAllDeptUser(deptList: any[], deptId: number | string) {
  const companyToken = await getCompanyToken()
  /** 获取wps部门列表 */
  // @ts-ignore
  const res = await deptsList(companyToken, `${deptId}`, 0, 1000)
  const { result, depts } = res
  console.log(depts.length, deptList.length)
  if (result !== 0) {
    throw Error('获取wps部门列表失败')
  }
  if (depts.length) {
    deptList.push(...depts)
    for (const itemDept of depts) {
      const deptId = itemDept.dept_id
      await getAllDeptUser(deptList, deptId)
    }
  }
}

/** 获取全部人员 */
export async function getUserAll(userList: any[], offset: number) {
  const companyToken = await getCompanyToken()
  const res = await getCompanyUsers(
    companyToken,
    offset === 0 ? 0 : offset * 1000 - 1,
    1000,
    'active,notactive,disabled'
  )
  const { result, company_users } = res
  if (result !== 0) {
    throw Error('获取wps用户列表失败')
  }

  //  一个用户多个部门进行拆分
  // for (let j = 0; j < company_users.length; j++) {
  //   const element = company_users[j]
  //   if (element.depts && element.depts.length > 0) {
  //     for (let i = 0; i < element.depts.length; i++) {
  //       if (i > 0) {
  //         const element1 = JSON.parse(JSON.stringify(element))
  //         element1.deptId = element.depts[i].id
  //         element1.deptName = element.depts[i].name
  //         userList.push(element1)
  //       } else {
  //         element.deptId = element.depts[i].id
  //         element.deptName = element.depts[i].name
  //       }
  //     }
  //   }
  // }

  userList.push(...company_users)
  if (company_users.length === 1000) {
    offset++
    await getUserAll(userList, offset)
  }
}
