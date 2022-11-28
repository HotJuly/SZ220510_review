<template>
  <div id="app">
    <BigImage v-bind="imageInfo">
      <template #content="scope">
        <!-- <h2 v-on="scope">点我放大,{{scope}}</h2> -->
        <h2 v-on="scope.listeners">点我放大,{{ scope.msg }}</h2>
      </template>
    </BigImage>
    
    <HelloWorld msg="Welcome to Your Vue.js App">
      <template>
        <h1>我是默认插槽</h1>
      </template>
      <!-- <template v-slot:header>
        <h1>我是header插槽</h1>
      </template> -->
      <template #header>
        <h1>我是header插槽</h1>
      </template>
      <!-- <template #footer="scope">
        <h1>我是footer插槽,{{scope.msg}}</h1>
      </template> -->
      <template #footer="{ msg }">
        <h1>我是footer插槽,{{ msg }}</h1>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import BigImage from '@/components/BigImage.vue';
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BigImage
  },
  data() {
    return {
      imageInfo: {
        src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'preview-src-list': [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
      }
    }
  }
}
</script>

<style>

</style>
