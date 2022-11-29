<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1 ref="h1" v-if="isShow1">我是H1标签</h1>
    <h2 ref="h2" v-if="isShow2">我是H2标签</h2>
    <h3 ref="h3" v-if="isShow3">我是H3标签</h3>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      isShow1:true,
      isShow2:false,
      isShow3:false,
    }
  },
  mounted(){
    /*
      问题:Vue2更新数据是同步更新还是异步更新?
      回答:同步更新

      问题2:Vue2更新DOM是同步更新还是异步更新?
      回答:异步更新,刚更新完数据,没办法立即得到他的最新的DOM节点
          因为Vue2将更新DOM的方法交给了nextTick执行,而nextTick中会开启.then微任务
    
      问题3:Vue2中nextTick的作用?
      回答:可以将一个回调函数延迟到DOM更新之后执行

      问题4:Vue2更新DOM的范围是多大?
      回答:以组件为单位

      总结:Vue2更新DOM是以组件为单位更新,无论在主线程代码中,更新了多少个状态数据,
        最终只会执行一次更新DOM的方法,因为这一次更新就能将所有状态的最新结果渲染在页面上

      Vue2响应式更新DOM流程
        假设现在更新了两个数据,this.isShow1=true,this.isShow2=true
        有三个组件使用到了isShow1,一个组件使用到isShow2

      流程:
        1.开发者书写this.isShow1 = true,会触发数据代理的set方法
        2.数据代理的set方法,会将当前最新值更新给data对象的同名属性,会触发数据劫持的set方法
        3.在数据劫持的set方法中,会触发dep.notify方法
        4.notify方法中,会遍历当前dep身上的subs数组,获取到内部的3个watcher对象
        5.调用三个watcher对象的update方法
        6.在update方法中,会调用queueWatcher方法,并将当前watcher对象作为实参传入
          注意:由于update方法执行了三次,所有queueWatcher方法也会执行三次
        7.在queueWatcher方法中,在has对象身上检查是否具有当前watcher对象的id同名的属性名
          -如果有同名,代表当前watcher已经来过一次,等下会被更新的,不需要重复更新,所以后续代码不执行
          -如果没有同名,代表当前watcher没来过,那么就会进入判断
        8.进入has的判断之后,会使用queue数组收集当前来的watcher对象
          注意:由于queueWatcher被调用了三次,所以这个queue数组中会收集3个watcher对象
        9.如果waiting为false,那么就会调用nextTick方法,将更新DOM的方法传入其中
          注意:由于waiting状态具有开关功能,所以此处虽然执行了3次queueWatcher,但是只会调用一次nextTick
        10.当微任务执行的时候,更新DOM的方法会被调用
          -使用sort方法对queue数组中的所有watcher以id进行升序排序
          -遍历queue数组,获取到内部所有的watcher对象,调用watcher对象的run方法,最终导致更新组件的cb函数被调用
            最终导致整个组件更新
    */

    this.isShow2 = true;

    this.$nextTick(()=>{
      console.log(this.$refs.h2)
      console.log(this.$refs.h3)
    })

    this.isShow3 = true;

  },
  methods:{

  },
  computed:{
    
  }
}
</script>

<style>
</style>
