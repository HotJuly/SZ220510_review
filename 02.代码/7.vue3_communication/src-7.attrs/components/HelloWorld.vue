<template>
  <div class="hello">
    <h1>hello</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
// attrs加强了,他合并了他的兄弟$listeners,它里面现在除了没人要的标签属性,还会存储没人要的自定义事件
import {useAttrs} from 'vue';
const props = defineProps(["a"]);
defineEmits(["abc"]);
const attrs = useAttrs();

console.log(props,attrs)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
