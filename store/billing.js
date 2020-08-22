import { hash } from '~/assets/utils'

const accessToken = localStorage.getItem(hash('access_token'))

export const state = () => ({
  company: {},
  stripe_customer: {},
  intent: '',
})

export const actions = {
  getStripe({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios({
        method: 'GET',
        url: `${process.env.NUXT_ENV_API_URL}/admin/billing/get-stripe`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          commit('setStripe', res.data)
          resolve()
        })
        .catch((err) => {
          reject(err.response.data)
        })
    })
  },
  setupPaymentMethod({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios({
        method: 'POST',
        url: `${process.env.NUXT_ENV_API_URL}/admin/billing/setup-payment-method`,
        data: {
          payment_method: payload,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          // accept stripe customer
          commit('setupPaymentMethod', res.data)
          resolve()
        })
        .catch((err) => {
          reject(err.response.data)
        })
    })
  },
}

export const mutations = {
  setStripe(state, data) {
    state.stripe_customer = data.stripe_customer
    state.intent = data.intent
    state.company = data.company
  },
}
