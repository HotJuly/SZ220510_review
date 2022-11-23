"use strict";

/*
    setTimeout是超时定时器
        第一个参数是延迟执行的回调函数
        第二个参数是延迟时间
            注意:延迟时间最小值为1,我们传入0也会变成1

    问题:有时候1,2,有时候又是2,1的
    原因:因为主线程代码如果没有花费到1ms,那么定时器很可能无法执行,
        会跳过这些定时器,前往下个阶段

    宏任务总结:
        1.node中一共具有6个宏任务队列,分别管理6个不同的宏任务类型
            所以可能会出现超车的情况
        2.回调函数会被立即放到对应的宏任务队列中,但是事件轮训的时候,如果没有满足条件是不会执行的
            否则会越过当前阶段,前往下一个阶段执行回调函数
        3.node中事件轮训的起点是1号阶段(timers阶段),休息区是4号阶段(I/O阶段)
            事件轮训就是必须从1号阶段到6号阶段,再回到1号阶段
                不存在跳阶段的情况
*/
var fs = require('fs');

setTimeout(function () {
  console.log(1);
}, 0);
fs.readFile('./01.原型相关.html', function () {
  console.log(2);
  setTimeout(function () {
    console.log(3);
  }, 0);
  setImmediate(function () {
    console.log(4);
  });
});
setImmediate(function () {
  console.log(5);
}); // setTimeout(()=>{
//     console.log(3)
// },0)

for (var index = 0; index < 100000; index++) {}
/*
    微任务本身就是js线程中的VIP,而nextTick是SVIP

    总结:
        1.node中具有两个微任务队列,一个是nextTick专用(SVIP),一个是.then专用(VIP)
        2.微任务队列每次都是清空操作,如果不执行完一个队列中的所有任务,
            是不能够跳转到另外一个微任务队列去的
*/
// Promise.resolve().then(()=>{
//     console.log(1);
//     process.nextTick(()=>{
//         console.log(2)
//     })
//     Promise.resolve().then(()=>{
//         console.log(3)
//     })
//     process.nextTick(()=>{
//         console.log(4)
//     })
//     Promise.resolve().then(()=>{
//         console.log(5)
//     })
// })