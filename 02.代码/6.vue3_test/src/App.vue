<template>
  <h1>user3.name:{{           user3.name           }}</h1>
  <h1>user3.age:{{           user3.age           }}</h1>
  <h1>arr2[0]:{{           arr2[0]           }}</h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { reactive } from 'vue';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {

    // 元对象
    let user = {
      name: "xiaoming"
    };

    let user3 = reactive(user);

    let arr = [6, 7, 8]

    let arr2 = reactive(arr);

    setTimeout(() => {
      // user3.age = 23;
      // delete user3.name;
      arr2[0] = 9;
    }, 2000)

    return {
      user3,
      arr2
    }
  }
}
</script>

<style>

</style>
