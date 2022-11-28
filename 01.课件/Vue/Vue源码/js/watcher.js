function Watcher(vm, exp, cb) {
  // new Watcher(vm,'msg' , function(value, oldValue) {
  //     textUpdater && textUpdater(text节点, value, oldValue);
  // });

  // this->watcher实例对象

  this.cb = cb;
  this.vm = vm;
  this.exp = exp;

  this.depIds = {};

  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    var value = this.get();

    var oldVal = this.value;

    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // this->watcher
    // watcher.addDep(dep);
    // a.hasOwnProperty('b')  ->  用于检查a对象身上是否具有b属性,如果有就返回true
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 没有记录过的dep都能进来
      // watcher对象身上使用depIds对象记录进来过的dep对象
      // watcher对象记录了与自己相关的dep对象
      // 插值语法记录了与自己相关的响应式属性
      this.depIds[dep.id] = dep;

      dep.addSub(this);
      // dep.addSub(watcher);
    }
  },
  get: function () {
    // this->watcher对象
    Dep.target = this;
    // Dep.target = watcher对象;

    var value = this.getVMVal();

    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    //this->watcher对象

    // exp->["msg"]
    var exp = this.exp.split(".");

    var val = this.vm._data;

    exp.forEach(function (k) {
      val = val[k];
    });

    // ["msg"].forEach(function (k) {
    //   val = vm._data["msg"];
    // });
    return val;
  },
};
