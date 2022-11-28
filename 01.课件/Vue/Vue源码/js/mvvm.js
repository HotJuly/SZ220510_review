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

  observe(data, this);

  this.$compile = new Compile(options.el || document.body, this);
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
