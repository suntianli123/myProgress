const md5 = require('md5')

/* 16位 */
export function mdEncryption16(content: any) {
  const str = md5(content).slice(8, 24)
  return str
}
/* 32位 */
export function mdEncryption32(content: any) {
  const str = md5(content)
  return str
}
