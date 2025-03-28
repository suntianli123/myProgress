interface Cache {
  deptData: any[],
  userData: any[],
  stockDeptFlag: Boolean,
  stockUserFlag: Boolean
}
export const cacheData: Cache = {
  deptData: [],
  userData: [],
  stockDeptFlag: false,
  stockUserFlag: false
}
