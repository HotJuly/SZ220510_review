/*
  ES6模块化语法特点
    无论一个文件被引入多少次,只会执行一次内部代码
    每次引入文件都会得到该文件暴露出来的内容,该文件暴露出去的是一个函数,
      所以每次调用得到的函数,函数内部的代码就会执行一次

*/
// 无论该文件引入了多少次,整个项目中,只会有一个callbacks数组
const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false

  const copies = callbacks.slice(0)
  callbacks.length = 0
  // 取出callbacks数组中的每个cb函数,并遍历执行
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

/*
  此处在检查当前浏览器是否支持Promise
    如果不支持Promise,那么.then就无法使用,
      Vue就会去检查是否具有mutationObserver方法,如果有就用它来替代.then

    如果不支持mutationObserver,那么就会使用setTimeout替代他们
*/
if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    // 该回调函数会立即被放入微任务队列中
    // 也就是说主线程代码执行结束之后,会开始执行这个微任务
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  /*
    nextTick通过callbacks数组,收集每次调用传入的cb回调函数
  
  */
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })

  /*
    无论执行多少次nextTick,这个判断都只能进去一次,
      因为pending初始值是false,但是进入判断之后,立即被改成了true
  
    在该判断中,会执行timerFunc,其中会使用.then开启一个微任务

    总结:也就是说无论执行多少次nextTick,都只会开启一个.then微任务
  */
  if (!pending) {
    pending = true
    timerFunc()
  }
}

/*
  nextTick源码重点
    1.首先nextTick文件中,会创建一个callbacks数组
      该数组永远只会存在一个,无论这个js文件被引入多少次

    2.该文件会暴露出去一个nextTick函数,每次调用该函数,
      他都会使用callbacks数组收集传入的回调函数

    3.如果是第一次执行nextTick,他会开启一个.then微任务
      但是后续再次调用nextTick,不会在开启新的微任务了,他们会共享同一个微任务

    4.当nextTick创建的微任务被执行的时候,Vue会遍历callbacks数组,调用内部存储的所有的cb函数


*/

/*
  Vue响应式更新DOM的流程:
    1.执行this.isEdit = true代码,会触发数据代理的set方法
    2.数据代理的set方法中,会触发数据劫持的set方法
    3.在数据劫持的set方法中,会调用dep.notify方法
    4.在dep.notify方法,会调用watcher.update方法
    5.在watcher.update方法中,会调用queueWatcher方法
    6.在queueWatcher方法,会将更新DOM的方法传入nextTick中
      等到主线程代码执行结束之后,开始执行更新DOM的操作

*/