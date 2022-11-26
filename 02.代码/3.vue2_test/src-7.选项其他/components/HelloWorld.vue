<template>
  <div class="hello">
    <h1 @click="changeValue">Hello:{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    value:String
  },
  methods:{
    changeValue(){
      this.$emit('input999',"我是Hello的数据")
    }
  },
  model:{
    prop:"msg",
    event:"input999"
  }
}
</script>

<style scoped>
</style>
