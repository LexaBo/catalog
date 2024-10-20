import Vue from 'vue';
import Vuex from 'vuex';
import favorites from '@/store/modules/favorites';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    favorites,
  },
});
