const data = {};
let name = 'Vue';
Object.defineProperty(data,'name',{
    get:function(){
        console.log('get')
        return name
    },
    set:function(newValue){
        console.log('set');
        name = newValue
        // 视图从新渲染
    }

})
console.log(data.name);
data.name = 'set改变后的名字';
console.log(data.name);