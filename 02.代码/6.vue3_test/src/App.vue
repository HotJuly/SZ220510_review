<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h1>user.name:{{user.name}}</h1>
  <h1>user.age:{{user.age}}</h1>
  <h1>user2.name:{{user2.name}}</h1>
  <h1>user2.age:{{user2.age}}</h1>
  <h1>user3.name:{{user3.name}}</h1>
  <h1>user3.age:{{user3.age}}</h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {ref,reactive} from 'vue';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup(){
    // console.log(1,this)
    /*
      ref和reactive的区别
        ref也可以接收一个对象数据类型,
          如果接收到了对象数据类型,就会将该数据传给reactive函数处理,得到代理对象之后,
          将这个代理对象的地址值保存在自己的value属性中

      区别:
        ref具有响应式属性value,如果对他进行重新赋值,他会对新传入的数据进响应式操作
        而reactve没有该功能

        使用区别:
          如果未来可能会更换响应式的对象,那么就是用ref,因为他的value属性可以监视地址值的变化
          如果未来只是修改响应式对象身上的属性,那么就使用reactive,因为他不需要.value就可以获取/更新数据
    */

    // 元对象
    let user = {
      name:"xiaoming",
      wife:{
        name:"666"
      }
    };

    let user2 = ref(user);
    // console.log(user2)

    
    let user3 = reactive(user);

    setTimeout(()=>{
      // user2.value.name="xiaohong111"

      // user3.name="xiaohong111"

      // console.log(user)

      // user2.value={
      //   name:"小红666"
      // }

      // 此操作,没有经过代理对象,所以没有响应式效果
      // user3 = {
      //   name:"小红666"
      // }
      // user3 = reactive({
      //   name:"小红666"
      // })
    },2000)

    return {
      user,
      user2,
      user3
    }
  },
  // beforeCreate(){
  //   console.log(2,this)
  // }
}
</script>

<style></style>
