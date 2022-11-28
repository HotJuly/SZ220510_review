<template>
    <div class="big">
        <!-- <el-image v-show="false" ref="image666" style="width: 100px; height: 100px" :src="url"
            :preview-src-list="preview-src-list"> -->

        <el-image v-show="false" ref="image666" style="width: 100px; height: 100px"
         v-bind="$attrs">
        </el-image>

        <!-- <img style="width: 100px; height: 100px" :src="url" alt="" srcset=""> -->
        <!-- <button @click="handler">查看大图</button> -->
        <!-- <slot name="content" :click="handler"></slot> -->
        
        <slot name="content" msg="hello" :listeners="{
            click:handler
        }"></slot>
    </div>
</template>
  
<script>
export default {
    name: 'BigImage',
    data() {
        return {
        }
    },
    // props:["preview-src-list"],
    mounted() {
    },
    methods: {
        handler() {
            this.$refs.image666.clickHandler();
        }
    }
}
</script>
  
<style scoped>

</style>
  