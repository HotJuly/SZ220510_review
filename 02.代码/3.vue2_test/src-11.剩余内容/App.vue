<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <A v-if="isShow"/>
    <B v-else/> -->

    
    <!-- <component :is="currentView"></component> -->
    <!-- <Transition name="fade" mode="out-in">
      <router-view></router-view>
    </Transition> -->

    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <!-- <keep-alive include="A"> -->
    <keep-alive exclude="A">
      <A v-if="isShow"/>
      <B v-else/>
    </keep-alive>
    <button @click="changeShow">切换</button>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import A from './components/A.vue'
import B from './components/B.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    A,
    B
  },
  data(){
    return{
      isShow:true,
      currentView:A
    }
  },
  methods:{
    changeShow(){
      this.isShow = !this.isShow;
      // this.currentView = B;

      // this.$router.push('/B')
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-enter-to, .fade-leave /* .fade-leave-active below version 2.1.8 */ {
  opacity: 1;
}

/* 
  开始离开的组件,会获得类名fade-leave,
    已经离开成功,会获得类名fade-leave-to

  开始进入的组件,会获得类名fade-enter,
    已经进入成功,会获得类名fade-enter-to
*/
</style>
