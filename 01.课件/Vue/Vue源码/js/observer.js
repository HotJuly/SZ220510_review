function Observer(data) {
    // new Observer(vm._data);
    // this->ob对象
    this.data = data;

    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        // this->ob对象
        // data->vm._data
        var me = this; 

        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });

        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", vm._data["msg"]);
        //     ob.convert("msg", "hello mvvm");
        // });

        
    },
    convert: function(key, val) { 
        //ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val); 
        // this.defineReactive(vm._data, "msg", "hello mvvm"); 
    },

    defineReactive: function(data, key, val) { 
        // this.defineReactive(vm._data, "msg", "hello mvvm"); 
        // this->ob对象

        // 创建了一个全新的dep对象
        // data中每具有一个直系属性名,就会创建一个对应的dep对象
        var dep = new Dep();  

        // 此处在对data中每个属性值进行深度递归操作
        // 对内部每个属性都进行深度数据劫持
        // 此处是一个隐式递归
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                childObj = observe(newVal);
                
                dep.notify();
            }
        });

        // 此处不是新增属性,而是重写属性
        // 将原本具有value值的msg属性,强行改变,变成get/set方法,所以原先的value值会丢失
        // 当开发者读取该属性的值的时候,会触发get方法,并返回当前属性的val值
        //          注意:Vue在此处使用闭包缓存了当前属性的value值,存在闭包val中
        // 当开发者修改该属性的值的时候,会触发set方法
        // Object.defineProperty(vm._data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
        //      如果新值和旧值相同,那么后续代码不会执行
        //      如果新旧值相同,DOM不会再次更新
        //         if (newVal === val) {
        //             return;
        //         }

        //         val = newVal;

        //      此处会将新值传入observe函数,对该数据进行深度数据劫持操作
        //      此处就是响应式属性创建的第二个时机
        //         childObj = observe(newVal);
                
        //        此处在通知DOM进行更新
        //         dep.notify();
        //     }
        // });


    }
    
};


function observe(value, vm) {
    // observe(vm._data, vm);
    // 此处在判断value值是否有值,而且是否是个对象
    // 如果不是对象或者没值,就直接return
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        // dep.addSub(watcher);

        // dep对象收集到了与他相关的所有watcher对象
        // 响应式属性收集到了与他相关的所有watcher对象
        this.subs.push(sub);
        // this.subs.push(watcher);
    },

    depend: function() {
        // dep.depend()
        // this->dep实例对象
        Dep.target.addDep(this);
        // watcher.addDep(dep);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;