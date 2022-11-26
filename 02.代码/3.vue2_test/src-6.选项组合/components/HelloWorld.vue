<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>我是Hello的name:{{user.name}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props: {
  //   msg: String
  // },
  inject:["msg","user"],
  mounted(){
    setTimeout(()=>{
      this.user.name="laowang666"
    },3000)
  }
}
</script>

<style scoped>
</style>
