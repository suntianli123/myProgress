IMAGE_NAME=${1} # 服务名
IMAGE_TAG=${2}
if [ -z ${IMAGE_NAME} ] || [ -z ${IMAGE_TAG} ];then
    echo "请指定镜像名和版本, 如:sh build.sh demo 0.0.1"
    exit -1
fi
cd service/${IMAGE_NAME}
docker build -f Dockerfile_arm64 . -t ${IMAGE_NAME}:${IMAGE_TAG}
