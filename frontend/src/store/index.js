import Vue from 'vue'
import Vuex from 'vuex'
import app from './app';
import user from './user';
import faculty from './faculty';
import activity from './activity';
import activityClass from './activity_class';
import student from './student';
import role from './role';
import unionTextbook from './union_textbook';
import unionFee from './union_fee';
import news from './news';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app, user, faculty, activity, activityClass, student, role, unionTextbook, unionFee, news,
  }
})
