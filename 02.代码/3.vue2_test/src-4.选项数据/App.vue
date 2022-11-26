<template>
  <div id="app">
    <!-- <HelloWorld :msg="msg" :fn="$options.fn"/> -->
    <HelloWorld :msg="msg" :fn="fn"/>
    <!-- <h1>{{_a}}</h1> -->
    <h1>user.name:{{user.name}}</h1>
    <h1>msg:{{msg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
    <h1>computedMsg:{{computedMsg}}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  /*
    面试题1:为什么data必须是一个函数
    回答:如果data写成了一个对象,那么当前组件创建得到的所有的实例对象,会共享这一个data对象,
      任何一个组件实例对该对象的数据进行修改,所有组件都会发生变化
        而data本应该存放的是当前组件自己独享的数据
      所以,如果data是一个函数的话,每次创建组件实例对象的时候,都会调用一次data函数,
        创建当前组件实例对象独享的一个data对象

    面试题2:现在我有一个数据,想要放在data中,但是又不想是响应式的?
    回答:
      1.将属性名以_或者$开头,那么该数据就不会被Vue去代理使用
      2.将对象传入Object.freeze方法中,将内部所有的属性都变成只读属性
  
  */
  data(){
    return{
      msg:123,
      _a:666,
      user:Object.freeze({
        name:"xiaoming"
      })
    }
  },
  mounted(){
    // console.log(this.msg,this._a)
    // this.user.name = "xiaohong"
    setTimeout(()=>{
      this.msg =this.msg* 2
    },2000)
  },
  methods:{
    fn(data){
      console.log(data,this)
      this.msg = data;
    }
  },
  fn(data){
    console.log(data,this)
  },
  /*
    面试题:请问computed和watch的区别
    回答:
      1.相同点
        他们都可以监视某个响应式属性的变化,如果属性值发生变化,
          那么对应的回调函数就会执行一次

      2.不同点
        1.返回值
          computed的返回值可以用于页面显示或者js计算
          watch的返回值根本没用,写了和没写没有区别

        2.使用场景
          computed
            我现在需要一个数据,但是我手头没有,不过我可以根据现有的数据计算的到
            具体的使用场景:例如购物车的总价总数等

          watch
            当某个数据发生变化的时候,我想做一些事情
            具体的使用场景:例如三级分类联动

          小总结:我个人认为,计算属性注重于结果,watch注重于过程
        
        3.缓存
          computed监视的数据如果发生了变化,那么会执行回调函数
            但是只执行一次,后续计算属性不需要再次计算,他们会复用上次的计算结果

          watch的返回值根本没用,所以没有缓不缓存这一说

        4.执行时机
          computed会在组件初始化的时候自动执行
          watch默认不会在初始化的时候执行,只会在数据更新的时候执行
            可以通过配置immediate:true可以实现在初始化阶段立即执行效果

        5.监视的范围
          computed是用到哪个属性就监视哪个属性
          watch是浅监听,假设user中存的是一个对象,那么他只会监视user的地址值是否发生变化
            如果想要监视内部的任何变化,那么需要添加deep:true才行
  */
  computed:{
    computedMsg(){
      console.log('computedMsg')
      return this.msg + "!"
    }
  },
  watch:{
    msg(){
      console.log('msg变了');
    }
  }
}
</script>

<style>
</style>
