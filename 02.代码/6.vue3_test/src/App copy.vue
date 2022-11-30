<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h1>msg:{{msg}}</h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue';

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

      ref
        数据类型:函数
        用处:他可以接受一个基本数据类型,实现响应式效果
        返回值是一个Ref对象,该对象具有一个响应式属性value
          如果在js中,想要修改他的数据,需要.value修改
          如果在template中,想要展示他的数据,不需要.value
    */

    let msg = ref(1);
    // console.log(msg)

    setTimeout(()=>{
      msg.value=3;
      // console.log(msg.value)
    },2000)

    return {
      msg
    }
  },
  // beforeCreate(){
  //   console.log(2,this)
  // }
}
</script>

<style></style>
