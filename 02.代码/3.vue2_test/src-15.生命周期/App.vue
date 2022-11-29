<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      msg:"我是初始化数据"
    }
  },
  // beforeCreate(){
  //   console.log('--------beforeCreate--------',this,this.$data,this.msg,this.$el)
  // },
  // created(){
  //   console.log('--------created--------',this,this.$data,this.msg,this.$el)
  // },
  // beforeMount(){
  //   console.log('--------beforeMount--------',this,this.$data,this.msg,this.$el)
  // },
  // beforeMount(){
  //   console.log('--------beforeMount--------',this.$vnode,this._vnode)
  // },
  // mounted(){
  //   console.log('--------mounted--------',this,this.$data,this.msg,this.$el)
  // }
  
  beforeCreate(){
    console.log('--------App beforeCreate--------')
  },
  created(){
    console.log('--------App created--------')
  },
  beforeMount(){
    console.log('--------App beforeMount--------')
  },
  mounted(){
    console.log('--------App mounted--------')
  }
}
</script>

<style>
</style>
