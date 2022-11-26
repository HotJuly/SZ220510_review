<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props: {
  //   msg: String
  // },
  props:["msg","fn"],
  mounted(){
    // 即便使用call都改不了methods方法的this指向,因为他底层使用bind强行改变了this指向
    // this.fn.call(window,678)
  }
}
</script>

<style scoped>
</style>
