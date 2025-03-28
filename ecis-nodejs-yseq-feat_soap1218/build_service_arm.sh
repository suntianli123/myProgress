set -x
Clean() {
    #clean tmp container and images
    # docker ps -a | grep "Exited"|awk '{print $1}' | xargs docker rm
    ExistedContainers=`docker ps -a | grep "Exited" |awk '{print $1}'`
    for element in ${ExistedContainers[@]}
    do
        echo "Exsited Container "$element
        docker rm $element
    done
    # docker images | grep none | awk '{print $3}' | xargs docker rmi
    NoneImages=`docker images | grep none | awk '{print $3}'`
    for image in ${NoneImages[@]}
    do
        echo "None image "$image
        docker rmi $image
    done
}

CID=${1} # 服务名
VERSION=${2}
if [ -z ${CID} ] || [ -z ${VERSION} ];then
    echo "请指定组件信息, 如:bash build_service_arm.sh cid version"
    echo "cid是组件的id"
    echo "version是组件的版本"
    echo "例如 bash build_service_arm.sh nodejs-demo 1.0.0"
    exit -1
fi

#获取脚本目录并切换到脚本所在目录
SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
echo $SHELL_FOLDER
cd $SHELL_FOLDER

IMAGEFILE="servie-arm-${CID}-${VERSION}"
METAJSON="meta.json"
OUTPUTFILE="${CID}_${VERSION}.ca"
OUTPUTDIR="dist"

rm -rf $OUTPUTDIR
mkdir -p $OUTPUTDIR

echo $IMAGEFILE $OUTPUTFILE

if [ ! -f $METAJSON ];then
    echo "meta.json文件不存在"
else
    sed -i "s/VERSION/$VERSION/g" $METAJSON
    sed -i "s/IMAGEFILE/$IMAGEFILE/g" $METAJSON
    #复制meta.json到output目录
    cp -r $METAJSON ./$OUTPUTDIR
fi

cd service
docker build . -f Dockerfile_arm64 -t service-arm-${CID,,}:${VERSION} && (docker save -o ../$OUTPUTDIR/$IMAGEFILE service-arm-${CID,,}:${VERSION};docker rmi service-arm-${CID,,}:${VERSION});
Clean

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
