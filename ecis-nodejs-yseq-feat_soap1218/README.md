# 代码结构

- ecissdk/ 定制能力SDK
- src/api/ API接口
- src/ins/ 全局实例
- src/model/ 定义数据模型
- src/util/ 工具方法
- src/unitest/ 单元测试
- src/index.ts 入口
- Dockerfile 本地开发构建Docker

# 基本操作

- 切换到服务目录：`cd service`
- 安装开发依赖：`npm i`
- Eslint：`npm run eslint`
- 格式化：`npm run format`
- 单元测试：`npm run test`
- 启动服务：`npm run nodemon`

## 本地开发构建说明

0. 修改meta.json文件
   修改appId、id、name四个字段属性值，其他字段值无需修改！

1. 构建Docker 镜像

参数为组件ID和版本号, 即会在dist目录下生成组件ca包
构建时会做单元测试, 需要保证单元测试正常

```
在根目录下执行
sh build_service.sh ${组件id} ${组件版本}
sh build_service.sh nodejs-demo 0.0.1
```

# 开发规范

- 使用Nodejs + Typescript + Koa2 框架开发
- ecissdk目录下的文件是grpc sdkclient相关代码，开发者无需进行修改
- 函数方法应该便于单元测试 
- 开发集中在service/<xxx>, unittest/xxx_test.go, manifest.json等3个目录和文件, 尽量不要对工程其他文件进行修改,否则可能导致构建不一致,失败等请求
- 开发者需要保证所有依赖能够通过公网拉取且能够通过Dockerfile 构建
- 服务名必须简单达意, 只能是26个小写字母,短横杆, 不能有特殊字符

# 单元测试

1. 所有单元测试写到unittest目录中
2. 命名`<功能点名称>.test.ts`

注: ecissdk 注意更新!

# git commit 规则

```
feat     A new feature.
fix      A bug fix.
docs     Documentation only changes.
style    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
refactor A code change that neither fixes a bug nor adds a feature.
test     Adding missing tests or correcting existing ones.
chore    Changes to the build process or auxiliary tools and libraries such as documentation generation.
perf     A code change that improves performance.
ci       Changes to your CI configuration files and scripts.
build    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
temp     Temporary commit that won't be included in your CHANGELOG.
```
注: 依赖husky, lint-staged
