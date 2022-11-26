<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>user的name:{{user.name | myFilter2}}</h1>
    <h1>user的age:{{user.age}}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import test from '@/mixins/test';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      user:{
        name:"xiaoming"
      }
    }
  },
  mixins:[test],
  filters:{
    myFilter2(value){
      // console.log(this)
      return value+"****************"
    }
  },
  mounted(){
    console.log('组件的mounted',this.$options.name)
    /*
      问题:什么是响应式属性?
      回答:如果某个属性的值被修改了,页面会自动展示出最新的结果

      问题:什么是非响应式属性?
      回答:如果某个属性的值被修改了,可是页面不会自动展示出最新的结果

      响应式属性创建的时机
        1.当组件初始化的时候,data中所有的属性都会被进行数据劫持,变成响应式属性
        2.当更新某个响应式属性的值的时候,如果传入的数据是个对象,Vue会对该对象进行数据劫持,
          将内部所有的属性都变成响应式属性

      问题:如何将一个非响应式属性变成响应式属性?
      回答:
        1.Vue.set
        2.this.$set
        3.Vue.observable
          这个方法可以将一个对象内部所有的属性都变成响应式属性

      问题:请问如何快速判断一个属性是否是响应式属性?
      回答:
          直接打印目标对象,如果属性值是显示...,那么这就是一个响应式属性
                          如果显示结果是原值,那么他就是非响应式属性

      注意点:
        如果想要将一个对象更新到data中,尽量在更新赋值之前,将需要的属性先提前添加到该对象中
          正确顺序:先添加属性,在更新赋值
    */

    // this.user = {...this.user,name:"xiaoming1"};
    // this.user.name="xiaohong"

    // const obj = {
    //   name:"laowang"
    // }

    // this.user = obj;
    // this.user.name = "laowang1"

    // this.user.age = 23;
    // this.user = {
    //   ...this.user,
    //   age:23
    // }
    // // console.log(this.user)
    // setTimeout(()=>{
    //   this.user.age = 29;
    // },3000)

    // Vue.set
    // this.$set(this.user,'age',23);
    
    // this.user.age = 23;
    // setTimeout(()=>{
    //   this.user.age = 29;
    // },3000)

    // console.log(this.user)

    // 该数据是服务器返回的数据
    // this.user = {
    //   name:"xiaolv"
    // };

    // this.user.age = 23;
    // setTimeout(()=>{
    //   this.user.age = 29;
    //   console.log(this.user)
    // },3000)

    
    // setTimeout(()=>{
    //   // 使用delete关键字删除某个属性,页面没有响应式效果
    //   // delete this.user.name
    //   // Vue.delete
    //   this.$delete(this.user,'name')
    //   console.log(this.user)
    // },3000)
    
  }
}
</script>

<style>
</style>
