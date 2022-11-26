export default {
  data(){
    return {
      pageX:0,
      pageY:0
    }
  },
  mounted(){
    /*
      需求:当用户的鼠标在页面上移动的时候,将鼠标的坐标显示在页面上
      拆解:
        1.当用户的鼠标在页面上移动的时候
          绑定事件监听
          事件源:document
          事件名:mousemove

        2.鼠标的坐标是多少
          可以从事件对象event身上获取

        3.如何将两个数字显示在页面上
          在data中创建两个响应式属性,将数据更新进去即可
    
    */

    document.addEventListener('mousemove',this.moveHandler);
  },
  // 写在methods中的方法,函数中的this一定是当前组件的实例对象
  methods:{
    moveHandler(event){
      // console.log(event)
      const {clientX,clientY} = event;
      this.pageX = clientX;
      this.pageY = clientY;
    }
  },
  beforeDestroy(){
    document.removeEventListener('mousemove',this.moveHandler);
  }
}