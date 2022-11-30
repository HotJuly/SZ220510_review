<template>
  <h1>msg:{{msg}}</h1>
  <HelloWorld :msg="msg"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
/*
  setup标签其实就是一个语法糖,他最终编译完之后还是setup函数
    1.在此处引入的组件,不需要注册
    2.setup标签会将内部直系的变量全部自动暴露出去,方便模版中使用
      不需要写return
*/
import {ref} from 'vue';
import HelloWorld from '@/components/HelloWorld'
let msg = ref(123);

setTimeout(()=>{
  msg.value=345
},2000)

</script>

<style>
</style>
