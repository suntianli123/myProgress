
const packageData = require("./manifest.json");
const { name, version} = packageData
const process = require('child_process');
const fs = require('fs')
 const path = require('path')


/**
 * 拷贝文件到指定文件夹
 * @param {string} src 源目录
 * @param {string} dest 目标目录
 * @param {string} fileName 拷贝的文件名称
 */
const copyDir = (src, dest, fileName) => {
  const copy = (copySrc, copyDest) => {
   const copyPath = path.resolve(copySrc)  
   fs.stat(copyPath, (err, stat) => {
      if (stat.isFile()) {
          const curDest = path.resolve(copyDest+fileName)
          // // 文件，直接复制
          fs.createReadStream(copyPath).pipe(fs.createWriteStream(curDest))
      }
   })
  }

  fs.access(dest, (err) => {
    if (err) {
      // 若目标目录不存在，则创建
      fs.mkdirSync(dest, { recursive: true })
    }
    copy(src, dest)
  })
}
 
 

// 执行 shell命令
;(function() {
    process.exec(`sh build.sh ${name} ${version} && sh export.sh ${name} ${version}`, (error, stdout, stderr) => {
      console.log(error, stdout, stderr)  
      if (!error) {
        // 成功
        const dockerName = `service-${name}.${version}`
        console.log(`docker镜像构建成功: ${dockerName}`)
        // 拷贝文件
        copyDir(path.join(__dirname, `/${dockerName}`), `/root/workspace/node/www/${name}/`, dockerName)
      } else {
        // 失败
        console.log('docker镜像构建失败')
      }
    });
  })();
