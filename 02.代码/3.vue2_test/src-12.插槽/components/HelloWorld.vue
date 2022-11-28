<template>
  <div class="hello">
    <slot></slot>
    <slot name="header"></slot>
    <slot name="footer" msg="大家好"></slot>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
