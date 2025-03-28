module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text'],
  testMatch: ['**/unittest/**/*.[jt]s?(x)']
}
