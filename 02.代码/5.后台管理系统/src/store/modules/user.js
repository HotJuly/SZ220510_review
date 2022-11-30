import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter , asyncRoutes , anyRoutes, constantRoutes} from '@/router'
import {cloneDeep} from 'lodash';

function filterAsyncRoutes(asyncRoutes,routeNames){
  /*
    需求:根据当前账号权限,过滤完整的异步路由数组,得到一个用户有资格访问的异步路由组成的数组
    返回值数据类型:routeObj[]

    filter方法,会生成一个全新的数组,会从旧数组中挑出部分数据保留,但是不会修改数据内容
  */
  const newAsyncRoutes = asyncRoutes.filter((routeObj)=>{
    const name = routeObj.name;

    // if(routeObj.children&&routeObj.children.length){
    if(routeObj.children?.length){

      routeObj.children = filterAsyncRoutes(routeObj.children,routeNames);
    }
    return routeNames.includes(name);
  })
  return newAsyncRoutes;
}

function mapButtons(buttons){
  /*
    现有数据->['btn.Trademark.add','btn.Trademark.update','btn.Trademark.remove'...]
  
    转换成以下结构:
      {
        'btn.Trademark.add':true,
        'btn.Trademark.update':true,
        'btn.Trademark.remove':true,
        .....
      }
  */
  const obj = {};
  buttons.forEach((str)=>{
    obj[str] = true;
  })

  return obj;
}

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',

    // 用于存储当前账号按钮级别的权限信息
    buttons:[],

    // 用于存储当前账号能够访问的路由的别名组成的数组
    routeNames:[],

    // 用于存储当前项目能访问的所有路由对象
    // 其实主要是为了解决左侧列表显示错误的问题
    routes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION: (state, {buttons,routes}) => {
    state.routeNames = routes;

    // 1.过滤asyncRoutes数组,得到当前账号能够访问的异步路由数组
    const newAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoutes),routes);

    router.addRoutes([...newAsyncRoutes,...anyRoutes]);

    state.routes = [...constantRoutes,...newAsyncRoutes,...anyRoutes];

    // state.buttons = buttons;
    state.buttons = mapButtons(buttons);
  }
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //     .then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const response = await login({ username: username.trim(), password: password });
      const { data } = response
      // 将请求回来的token存入Vuex的state中(相当于存储于内存中)
      commit('SET_TOKEN', data.token)
      // 将请求回来的token存入cookie中(相当于存储于硬盘中)
      // cookie相对localStorage的好处:每次发送请求会自动携带该token
      setToken(data.token)
    } catch (error) {
      console.log('error')
    }

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_PERMISSION',data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  // 开启命名空间,相当于是对所有的state,action,mutation进行模块化管理(类似作用域)
  //  dispatch('user/login')
  namespaced: true,
  state,
  mutations,
  actions
}

