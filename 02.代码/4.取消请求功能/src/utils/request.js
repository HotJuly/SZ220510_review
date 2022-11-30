import axios from 'axios';
import store from '@/store';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

const CancelToken = axios.CancelToken;

request.interceptors.request.use((config)=>{
    // 1.获取当前发出的请求的路径
    const url = config.url;

    // 2.给每个发出去的请求添加上一个唯一的标识,
    // 并且CancelToken可以接收一个函数,该函数会被同步执行
    config.cancelToken = new CancelToken((cb)=>{
        // 如果cb被调用,那么该请求就会取消
        store.commit('ADD_FN',{url:url,cb:cb})
    });

    return config
})

request.interceptors.response.use((response)=>{
    // console.log(response)

    // 1.获取到本次响应的请求链接
    const url = response.config.url;

    // 2.调用删除的mutation,将之前的记录去掉
    store.commit('REMOVE_FN',url)

    return response.data;
})

export default request