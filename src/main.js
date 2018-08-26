// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueMDCAdapter from 'vue-mdc-adapter'
import './theme.scss'
import App from './App'
import router from './router'
import Data from '@/services/gameData'
// import igdb from 'igdb-api-node'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueMDCAdapter)

// For image of each game
//
// const client = igdb('add your own')
// const log = response => {
//   if (response.body[0].cover) {
//     return response.body[0].cover.url
//   }
//   return null
// }

// let getImage = (title) => {
//   let img
//   client.games({
//     limit: 1,
//     search: title
//   }, [
//     'cover'
//   ]).then(log)
//   .then(url => {
//     img = url
//   })
//   return img
// }
const store = new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    getGames (state) {
      Data.getAllGames()
      .then(data => {
        data.map(el => {
          el.id = 'ga' + el.platform + '@' + el.title
          // el.img = getImage(el.title)
        })
        state.data = data
      })
    }
  }
})
store.commit('getGames')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
