export default {
    bind(el,binding,vnode){
        console.log(el);
        console.log(binding);
    },
    update(el,binding,vnode){
        console.log('update');
    }
}