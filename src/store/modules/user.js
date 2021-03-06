import { loginByUsername,getUserInfo,logout } from '@/api/login'

import { getToken,setToken,removeToken } from '@/utils/auth'

const user={
  state:{
    token:getToken(),
    avatar:'',
    name:'',
    flag:false
  },

  mutations:{
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_FLAG: (state, flag) => {
      state.flag = flag
    }
  },

  actions:{
    LoginByUsername({commit},userInfo){
      const username= userInfo.username
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          console.log(response)
          setToken(true);
          commit('SET_TOKEN', true)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    LogOut({commit,state}){
      return new Promise((resolve, reject) => {
        logout().then(response => {
          commit('SET_TOKEN', false)
          commit('SET_FLAG', false)
          sessionStorage.removeItem('user')
          removeToken()
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo({commit,state}){
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data
          commit('SET_NAME', data.userName)
          commit('SET_AVATAR', data.avatar)
          commit('SET_FLAG', true)
          const user={}
          user.name=data.userName
          user.avatar=data.avatar
          sessionStorage.setItem('user',JSON.stringfy(user))
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', false)
        commit('SET_FLAG', false)
        removeToken()
        resolve()
      })
    }
  }


}

export default user
