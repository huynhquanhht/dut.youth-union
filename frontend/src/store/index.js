import Vue from 'vue'
import Vuex from 'vuex'
import app from './app';
import user from './user';
import aUnionBranch from './association_union_branch';
import activity from './activity';
import unionBranch from './union_branch';
import unionMember from './union_member';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app, user, aUnionBranch, activity, unionBranch, unionMember
  }
})
