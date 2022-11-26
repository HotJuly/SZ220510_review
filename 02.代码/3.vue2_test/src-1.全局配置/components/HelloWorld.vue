<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  a:5,
  mounted(){
    // console.log('Hello',this.$options.a)
  }
}
</script>

<style scoped>
</style>
