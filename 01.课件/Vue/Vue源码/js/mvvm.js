function MVVM(options) {
  /*
    this->组件实例对象,简称vm对象
    options->{
        el: "#app",
        data: {
          msg: "hello mvvm",
          person:{
            name:"xiaoming",
            msg:"123"
          }
        }
      }
  */

  this.$options = options;

  // 一共具有三个地方存储着data对象的地址值
  // 此处的this._data其实就是Vue2中的this.$data
  var data = this._data = this.$options.data;
  // var data = (this._data = this.$options.data);
  // var data = (this.$options.data);

  var me = this;

  Object.keys(data).forEach(function (key) {
    me._proxy(key);
  });
  /*
    MVVM源码第一部分:数据代理
    代理:生活中,我们找代理商买东西,他会找厂家获取东西,再将得到的货物交给我们
      这个过程中,我们以为代理商有东西,实际上他没有,只有厂家有东西
    目的:为了开发者方便开发,书写代码的时候,可以直接通过this.msg获取到this._data.msg中的数据
      他不是响应式原理中,必不可少的一环
    次数:2次(数据代理的次数与data对象直系属性名个数有关)
    流程:
      1.使用Object.keys方法获取到data对象身上所有的直系属性名组成的数组
      2.遍历流程1中得到的数据,对得到的每个属性名进行数据代理操作
      3.使用Object.defineProperty方法,给vm对象身上新增了很多与data中同名的属性名
        每个属性都具有get/set方法
        get->当读取该属性的值的时候,会触发get方法,并将data对象中同名属性的值返回出去
        set->当修改该属性的值的时候,会触发set方法,同步执行修改data对象同名属性的值
  */

  // Object.keys方法可以获取到一个对象身上所有的直系属性名
  // ["msg","person"].forEach(function (key) {
  //   vm._proxy("msg");
  // });
  /*
    响应式效果
      需求:当某个属性值发生变化的时候,页面自动显示最新的数据
      拆解:
        1.当某个属性值发生变化的时候
          事件监听
            使用Object.defineProperty,可以让一个属性具有get和set方法,
              那么只要该属性被修改了,就会触发set方法

        2.页面自动显示最新的数据
            使用原生DOM操作,对页面上的某个节点进行修改

    准备工作:
      1.在对data中的数据做数据劫持的时候,会给每个响应式属性创建一个dep对象
      2.在解析模版的时候,会给每个插值语法创建一个对应的watcher对象
      3.在new Watcher中,会调用this.get方法
      4.在this.get方法中,会将Dep.target修改为当前的watcher对象
      5.watcher对象会读取当前插值表达式的结果,读取的过程中会触发相关的响应式属性的get方法
        此处触发的是data对象中,被数据劫持过的,msg属性的get方法
      6.在流程5的get方法中,会调用dep.depend方法开始收集dep和watcher的映射关系
      7.使用watcher.addDep方法,让watcher对象使用depIds对象,收集与自身相关的dep
      8.调用dep.addSub方法,让dep对象使用subs数组,收集与自身相关的watcher

    响应式更新DOM流程:
      1.开发者书写vm.msg=123,会触发msg数据代理的set方法
      2.在数据代理的set方法中,会将最新结果传给vm._data对象的msg属性,进行赋值操作
      3.但是对data中的属性进行赋值操作,会触发该属性数据劫持的set方法
      4.在数据劫持的set方法中,会调用dep.notify方法
      5.notify方法中,会遍历subs数组,调用内部每个watcher对象的update方法
      6.在update方法中,
        -会获取到当前表达式最新的结果
        -获取到上一次的最新的结果
        -比较新旧两个值,如果新旧两个值不同,就将新值存入watcher身上,留作下次使用
        -调用this.cb回调函数,并传入本次的最新结果,用于更新对应的DOM节点
  */

  /*
    MVVM源码第二部分:数据劫持
    劫持:将某个人绑架,限制他的人身自由,逼迫他做他不想做的事情
    目的:
      1.将data对象身上,所有的属性都进行重写,变成响应式属性
      2.为了实现响应式原理,用于监视用户对属性的修改和读取操作
    次数:4次(数据劫持的次数与data中具有多少个属性名有关)
    流程:
      1.执行observe函数,将data传入内部,判断他是否有值而且是不是个对象
        如果没值或者不是对象,那么数据劫持流程就结束了
      2.在observe中,会创建一个Observer实例对象
      3.ob对象会调用walk方法,使用Object.keys方法获取到data中所有的直系属性名,
        并对每个属性进行执行defineReactive
      4.在defineReactive中,
        -会创建一个全新的dep对象
          总结:每具有一个响应式属性就会创建一个对应的dep对象
        -将当前属性值传入observe函数,如果是个对象那么就回到流程2,继续深度递归数据劫持
        -使用Object.defineProperty方法,对data对象身上的某个属性进行重写操作
          将该属性的value值去掉,变成get/set方法
            但其实,Vue很巧妙的使用了闭包将原先的value值缓存起来了
            如果用户读取该属性的值的时候,会触发get方法,自动返回闭包val中的结果
            如果用户修改该属性的值的时候,会触发set方法
              -判断新旧值是否相同,相同直接return,后续代码不执行
              -将新值存入闭包中进行缓存
              -将新值传入observe,如果是个对象,那么就进行深度数据劫持
              -调用dep.notify方法,通知DOM进行更新
  
  */

  observe(data, this);
  // observe(vm._data, vm);

  /*
    MVVM源码第三部分:模版解析
    目的:
      1.将模版中的插值语法或者指令进行解析,展示对应的效果->首次渲染
      2.创建watcher对象,用于实现响应式原理

    流程:
      1.构造调用Compile函数,并options.el中的内容传给该函数
      2.判断el中的内容是否是真实DOM,如果不是就在页面上找到对应的节点
        给$el元素准备好对应的真实DOM
      3.将el元素中的所有子节点,全部转移到文档碎片对象中,准备进行解析
      4.调用init方法开始解析,获取到文档碎片中的所有子节点,并开始遍历解析
        -如果子节点是元素节点,就获取他身上所有的标签属性节点,并判断是否是指令,对其进行解析
        -如果子节点是文本节点,而且文本内容匹配了插值语法的正则判断,
          就获取到他内部的表达式,开始解析该文本节点
      5.解析文本节点的过程中,会调用bind方法
      6.在bind方法中,
        -获取到对应的文本更新器函数textUpdater
        -获取到对应表达式的属性值,并将该属性值传入textUpdater中,对指定文本节点进行更新
        -创建全新的watcher对象
          总结:每一个插值表达式都会创建一个对应的watcher对象
      7.当所有的节点都解析结束之后,会将文档碎片对象插入到$el元素中,挂载到页面上


  */

  this.$compile = new Compile(options.el || document.body, this);
  // this.$compile = new Compile("#app", vm);
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    //   vm._proxy("msg");
    // this->vm对象
    // key=>"msg"

    var me = this;

    Object.defineProperty(me, key, {
      configurable: false, //不能重复定义
      enumerable: true, //可以遍历
      get: function proxyGetter() {
        return me._data[key];
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      },
    });

    /*
      我们平常使用字面量方法创建的对象,它具有key和value两个内容
      var obj = {name:"xiaoming"}

      可以使用Object.defineProperty,给某个对象添加/修改一个属性
        那个新的属性,可以具有set/get方法,但是value值就会丢失
          也就是说get/set方法和value值不能共存,互斥
    
        get->当读取该属性的值的时候,会触发get方法,并将get方法的返回值返回出去
        set->当修改该属性的值的时候,会触发set方法,同步执行内部的所有代码

      具有get/set的属性,我们成为访问描述符
    */
  //  此处在给vm对象身上新增一个msg属性
    // Object.defineProperty(vm, "msg", {
    //   configurable: false, //不能重复定义
    //   enumerable: true, //可以遍历
    //   get: function proxyGetter() {
    //     return vm._data["msg"];
    //   },
    //   set: function proxySetter(newVal) {
    //     vm._data["msg"] = newVal;
    //   },
    // });

  },
};
