<template>
    <el-tooltip class="item" effect="dark" :content="title" placement="left-end">
        <!-- <el-button :type="type" :size="size">添加</el-button> -->
        <!-- <el-button v-bind="{
            type,
            size
        }">添加</el-button> -->
        <!-- <el-button v-bind="$attrs" @click="handler">添加</el-button> -->
        <!-- <el-button v-bind="$attrs" v-on="{
            click:handler
        }">添加</el-button> -->
        <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
        
        <!-- <button @click="handler">添加222</button> -->
        <!-- <button v-on="$listeners">添加222</button> -->
    </el-tooltip>
</template>
  
<script>
export default {
    name: 'HintButton',
    // props:["size","type","title"]
    props:["title"],
    methods:{
        handler(){
            this.$emit('click')
        }
    }
}
</script>
  
<style scoped>

</style>
  