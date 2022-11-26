<template>
  <div class="hello">
    <h1 @click="handler">Hello:{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    handler(){
      this.$emit('update:msg','我是Hello的数据')
    }
  },
  mounted(){
    console.log(1,this)
    // this.$bus.$on('getMsg',(data)=>{
    //   console.log('App',data)
    // })
  }
}
</script>

<style scoped>
</style>
