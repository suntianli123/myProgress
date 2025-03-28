CID=${1} # 服务名
VERSION=${2}
if [ -z ${CID} ] || [ -z ${VERSION} ];then
    echo "请指定组件ID和版本, 如:sh build.sh demo 0.0.1"
    exit -1
fi
IMAGEFILE="servie-${CID}-${VERSION}"
METAJSON="meta.json"
OUTPUTFILE="${CID}_${VERSION}.ca"
OUTPUTDIR="dist"

rm -rf $OUTPUTDIR
mkdir -p $OUTPUTDIR

echo $IMAGEFILE $OUTPUTFILE
cd service

# 系统环境判断 x86 或者 arm64
get_arch=`arch`
if [[ $get_arch =~ "x86_64" ]];then
    echo "当前环境是：x86_64"
    docker build . -f Dockerfile -t service-${CID,,}:${VERSION}
elif [[ $get_arch =~ "aarch64" ]];then
    echo "当前环境是：arm64"
    docker build . -f Dockerfile_arm64 -t service-${CID,,}:${VERSION}
    
elif [[ $get_arch =~ "mips64" ]];then
    echo "mips64"
else
    echo "unknown!!"
fi

docker save -o ../$OUTPUTDIR/$IMAGEFILE service-${CID,,}:${VERSION}

if [ ! -f $METAJSON ];then
    echo "meta.json文件不存在"
else
    sed -i "s/CID/$CID/g" $METAJSON
    sed -i "s/VERSION/$VERSION/g" $METAJSON
    sed -i "s/IMAGEFILE/$IMAGEFILE/g" $METAJSON
    #复制meta.json到output目录
    cp -r $METAJSON ../$OUTPUTDIR
fi

#zip
cd ../$OUTPUTDIR
if [ -f $IMAGEFILE ] && [ -f $METAJSON ]; then
    zip $OUTPUTFILE $IMAGEFILE $METAJSON
else
    echo "打包失败,image or meta.json不存在"
    exit -1
fi
if [ ! -f $OUTPUTFILE ];then
    echo "打包失败,ca文件不存在"
    exit -1
fi
cd ..
echo "service组件打包成功"
