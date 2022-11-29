<template>
  <div id="app">
    <router-view/>
    <router-link to="/home">toHome</router-link>
    <!-- <router-link to="/about">toAbout</router-link> -->
    <button @click="toAbout">toAbout</button>
    <h1 v-if="$route.meta.isShowHeader">我是header</h1>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{
    toAbout(){
      // this.$router.push('/about');
      this.$router.replace('/about');
    }
  }
}
</script>

<style>
</style>
