<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <h1 v-if="isShow">我是h1</h1> -->

    <input ref="input666" v-if="isEdit" type="text">
    <button v-else @click="changeEdit">添加</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// console.log(HelloWorld)

export default {
  name: 'App',
  // components中会根据传入的配置对象,创建对应组件的构造函数
  components: {
    HelloWorld
  },
  data() {
    return {
      isShow: false,
      isEdit: false
    }
  },
  mounted() {
    /*
      面试题1:请问Vue更新数据是同步更新还是异步更新?
      答案:同步修改

      面试题2:请问Vue更新DOM是同步更新还是异步更新?
      答案:异步更新(其实内部使用到了nextTick)

      响应式:当数据发生变化的时候,页面要展示出最新的结果
    */
    //  this.isShow = true;
    //  console.log(this.isShow)

    //  debugger

    // this.isEdit=true;
    // 这里感觉像是有一个看不见的nextTick

    // Promise.resolve().then(() => {
    //   console.log(1)
    // })

    // this.$nextTick(() => {
    //   console.log(2)
    // })

    // Promise.resolve().then(() => {
    //   console.log(3)
    // })

    // this.$nextTick(() => {
    //   console.log(4)
    // })


  },
  methods: {
    changeEdit() {
      /*
        nextTick
          1.他是一个Vue专用的函数
          2.它可以接收一个回调函数,这个回调函数会被延迟执行
            延迟到DOM更新结束之后
          3.也就是说在回调函数中,一定能得到最新的DOM节点
      
          原理:
            1.它内部使用到了.then微任务去执行回调函数

          注意点:
            nextTick中的回调函数如果想要使用最新的DOM节点,
              一定要将nextTick写在更新数据之后
      
      */

      this.isEdit = true;

      this.$nextTick(() => {
        this.$refs.input666.focus();
        console.log(3)
      })

      // Promise.resolve().then(() => {
      //   console.log(2)
      // })

      // this.$nextTick(() => {
      //   console.log(1)
      // })

      // this.isShow = true;

      // await this.$nextTick();
      // this.$refs.input666.focus();
    }
  }
}
</script>

<style>

</style>
