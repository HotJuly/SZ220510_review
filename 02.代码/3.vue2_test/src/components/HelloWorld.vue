<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <h1>{{ a }}</h1>
    <h1>{{ b }}</h1>
    <h1>{{ c }}</h1> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    // console.log('hello',this.$props.msg)
    // console.log('hello',this.$parent.msg)
    // this.$parent.a();
    // console.log('hello',this.$root.$options.name)

    console.log(this.$attrs)
    console.log(this.$listeners)
  }
}
</script>

<style scoped>
</style>
