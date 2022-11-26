<template>
  <div id="app">
    <h1 ref="h1s">msg:{{ msg }}</h1>
    <HelloWorld ref="hello666" msg="Welcome to Your Vue.js App" />
    <!-- <BigImage/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/BigImage.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BigImage
  },
  data() {
    return {
      msg: "我是初始化数据"
    }
  },
  mounted() {
    // 平常写的this.msg=>其实就等于this.$data.msg
    // console.log(this.$data)
    // this.msg = 666;
    // setTimeout(() => {
    //   Object.assign(this.$data, this.$options.data())
    // }, 3000);
    // console.log(this.$children[0].msg)

    console.log(this.$refs.h1s)
    console.log(this.$refs.hello666)
  },
  methods:{
    a(){
      console.log('我是APP的a')
    }
  }
}
</script>

<style>

</style>
