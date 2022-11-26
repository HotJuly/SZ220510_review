<template>
  <div id="app">

    <!-- <HelloWorld  
    msg="Welcome to Your Vue.js App" 
    a="1" 
    b="2" 
    c="3"
    @abc.native=""
    @cgh=""
    /> -->

    <HintButtonVue 
    size="small" 
    type="danger" 
    title="注意这是删除按钮"
    @click123="handler1"
    />
    <!-- <HintButtonVue v-bind="$data" title="注意这是删除按钮"/> -->
    <HintButtonVue size="big" type="primary" title="没事这是添加按钮"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HintButtonVue from './components/HintButton.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    HintButtonVue
  },
  data() {
    return {
      size:"small",
      type:"danger"
    }
  },
  methods:{
    handler1(){
      console.log('handler1触发成功,即将发送请求....')
    }
  }
}
</script>

<style>

</style>
