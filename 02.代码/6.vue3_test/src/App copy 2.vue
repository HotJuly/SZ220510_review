<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h1>user.name:{{user.name}}</h1>
  <h1>user.age:{{user.age}}</h1>
  <h1>user2.name:{{user2.name}}</h1>
  <h1>user2.age:{{user2.age}}</h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {reactive} from 'vue';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup(){
    // console.log(1,this)
    /*
      setup生命周期
        他没有this,this是undefined
        setup标签其实编译完之后,会变成setup函数
        setup函数会返回一个对象,该对象中的数据,可以用作页面展示使用


      reactive
        数据类型:函数
        用处:他可以接受一个对象数据类型,返回出去一个代理对象(Proxy)
          如果直接修改元对象,是没有响应式效果的
          如果修改代理对象,就会有响应式效果
        如果我们操作代理对象,不仅会修改元对象的数据,还会具有响应式的效果
    */

    // 元对象
    let user = {
      name:"xiaoming"
    };

    // 代理对象
    let user2 = reactive(user);
    // console.log(user2.name)

    setTimeout(()=>{
      // user.name="xiaohong111"
      user2.name="xiaohong111"
      console.log(user)
    },2000)

    return {
      user,
      user2
    }
  },
  // beforeCreate(){
  //   console.log(2,this)
  // }
}
</script>

<style></style>
