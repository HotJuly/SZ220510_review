<template>
  <div class="Home">
    <h1>Home</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted(){
    console.log(this.$router,this.$route)
  }
}
</script>

<style scoped>
</style>
