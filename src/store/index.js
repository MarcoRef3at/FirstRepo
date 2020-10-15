import Vue from 'vue'
import Vuex from 'vuex'
import  FeatureDataService  from '../services/FeatureDataService.js';
Vue.use(Vuex)

const state= {
  features:[],

};
const mutations= {
  getFeatures(state, features){
    state.features=features;
  },
};
const actions= {

 getFeaturesAction({ commit }){
  FeatureDataService.getAll().then(result =>{
    commit('getFeatures',result.data);
  })
}

};
const getters= {};
export default new Vuex.Store({
  state,
  mutations ,
  actions,
  getters,
})
