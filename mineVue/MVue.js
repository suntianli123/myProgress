const compileUtil = {
    getVal(expr,vm){
        return expr.split('.').reduce((data,currentVal)=>{
            return data[currentVal];
        },vm.$data)
    },
    setVal(expr,vm,inputVal){
        return expr.split('.').reduce((data,currentVal)=>{
            data[currentVal] = inputVal;
        },vm.$data)
    },
    getContentVal(expr,vm){
        return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            return this.getVal(args[1],vm)
        })
    },
    text(node,expr,vm){     // expr:msg
        let value;
        if(expr.indexOf('{{') != -1){
            // 处理 {{person.name}} -- {{person.age}}
            value = expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
                new Watcher(vm,args[1],(newVal)=>{
                    this.updater.textUpdater(node,this.getContentVal(expr,vm));
                });
                return this.getVal(args[1],vm)
            })
        }else{
            value = this.getVal(expr,vm);
        }
        this.updater.textUpdater(node,value);
    },
    html(node,expr,vm){
        const value = this.getVal(expr,vm);
        new Watcher(vm,expr,(newVal)=>{
            this.updater.htmlUpdater(node,newVal)
        })
        this.updater.htmlUpdater(node,value)
    },
    model(node,expr,vm){
        const value = this.getVal(expr,vm);
        new Watcher(vm,expr,(newVal)=>{
            this.updater.modelUpdater(node,newVal)
        })
        node.addEventListener('input',(e)=>{
            this.setVal(expr,vm,e.target.value)
        });
        this.updater.modelUpdater(node,value)
    },
    on(node,expr,vm,eventName){
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName,fn.bind(vm),false);
    },
    updater:{
        textUpdater(node,value){
            node.textContent = value
        },
        htmlUpdater(node,value){
            node.innerHTML = value
        },
        modelUpdater(node,value){
            node.value = value
        }
    }
}

class Compile{
    constructor(el,vm){
        this.el = this.isElementMode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 1、获取文档碎片对象，放入内存中会将减少页面的回流和重绘
        const fragment = this.node2Fragment(this.el);
        // 2、编译模板
        this.compile(fragment);
        // 3、追加子元素到根元素
        this.el.appendChild(fragment);
    }
    compile(fragment){
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child =>{
            if(this.isElementMode(child)){
                // 元素节点
                // console.log('元素节点',child);
                this.compileElement(child);
            }else{
                // 文本节点
                // console.log('文本节点',child)
                this.compileText(child)
            }
            if(child.childNodes && child.childNodes.length){
                this.compile(child)
            }
        })
    }
    compileElement(node){
        const attributes = node.attributes;
        [...attributes].forEach(attr =>{
            const {name,value} = attr;
            if(this.isDirective(name)){
                // 是一个指令
                const [,dirctive] = name.split('-');
                const [dirName,eventName] = dirctive.split(':');
                // 更新数据   数据驱动视图
                compileUtil[dirName](node,value,this.vm,eventName);

                // 删除有指令的标签上的属性
                node.removeAttribute('v-' + dirctive)
            }else if(this.isElementName(name)){
                let [,eventName] = name.split('@');
                compileUtil['on'](node,value,this.vm,eventName);
            }
        })
    }
    isElementName(attrName){
        return attrName.startsWith("@");
    }
    compileText(node){
        const content = node.textContent;
        if(/\{\{(.+?)\}\}/.test(content)){
            compileUtil['text'](node,content,this.vm)
        }
    }
    isDirective(attrName){
        return attrName.startsWith("v-");
    }
    isElementMode(node){
        // 判断是不是元素节点对象
        return node.nodeType === 1;
    }
    node2Fragment(el){
        // 创建文档碎片
        const f = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild){
            f.appendChild(firstChild)
        }
        return f
    }
}

class MVue{
    constructor(options){
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if(this.$el){
            new Observer(this.$data);
            // 有值，1、实现数据的观察者
            // 2、实现一个指令解析器
            new Compile(this.$el,this)
        }
    }
}