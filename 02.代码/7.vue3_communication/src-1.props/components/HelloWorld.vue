<template>
  <div class="hello">
    <h1>hello</h1>
    <h2>hello的msg:{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props:["msg"],
  // props:{
  //   msg:String
  // }
}
</script>

<script setup>
/*
interface IProps{
  msg:String
}
 defineProps<IProps>();
 */
// 由于defineProps和defineEmits两个方法使用频率较高,所以Vue3已经将这两个方法变为编程宏
// 编程宏->Vue代码中会自动引入的内容
const props = defineProps(["msg"]);
console.log(props)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
