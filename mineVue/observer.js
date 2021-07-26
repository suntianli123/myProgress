const data = {
    name:'王五',
    age:'10',
    friend:{
        fdName:'老六'
    },
    colors:['red','yellow','green']
};

const oldArrayProto = Array.prototype;
const newArrayProto = Object.create(oldArrayProto);
['push','pop','shift','unshift','splice'].forEach(methodName=>{
    newArrayProto[methodName] = function(){
        oldArrayProto[methodName].call(this,...arguments);
    }
});

// 变成响应式数据
observer(data);
function observer(target){
    if(typeof target !== "object" || target === null){
        return target
    }
    if(Array.isArray(target)){
        target.__proto__ = newArrayProto
    }
    for(let key in target){
        defineReactive(target,key,target[key])
    }
}

function defineReactive(target,key,value){
    observer(value);
    Object.defineProperty(target,key,{
        get(){
            return value
        },
        set(newValue){
            observer(newValue);
            if(newValue !== value){
                value = newValue;
                console.log('更新视图')
            }
        }
    })
}
// data.age = 20;
data.friend.fdName = '小名';
data.colors.push('black');