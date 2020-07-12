import Vue from 'vue'

const QUERY_ME = <%= options.gql('fetch-me.gql') %>
const MUTATION_LOGOUT = <%= options.gql('logout.gql') %>

; /* --- */ ;

const state = Vue.observable({
  me: null,
})

export default function ({app}, inject) {
  const {$apollo} = app

  const $app = {
    state,

    async fetchMe() {
      const {data: {me}} = await $apollo.auth.query({
        query: QUERY_ME,
      })
      if (me) {
        state.me = me
      }
      return state.me
    },

    async logOut () {
      state.me = null
      const {data: {success}} = await $apollo.auth.mutate({
        mutation: MUTATION_LOGOUT,
      })
      return success
    },
  }

  inject('app', $app)
}
