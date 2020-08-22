import { hash, unhash } from '~/assets/utils'

export const state = () => ({
  entity: {
    email: '',
    company: '',
    password: '',
    confirm_password: '',
  },
  subscription_plan: {},
})

export const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios({
        method: 'POST',
        url: `${process.env.NUXT_ENV_API_URL}/login`,
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((res) => {
          this.$axios.setHeader(
            'Authorization',
            `Bearer ${res.data.access_token}`
          )

          commit('authCredentials', res.data)

          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios({
        method: 'GET',
        url: `${process.env.NUXT_ENV_API_URL}/admin/logout`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(hash('access_token'))}`,
        },
      })
        .then(() => {
          commit('clearAuthCredentials')
          resolve()
        })
        .catch(() => {
          reject()
        })
    })
  },
}

export const mutations = {
  authCredentials(state, data) {
    const user = JSON.parse(data.user)

    state.entity = user
    state.subscription_plan = data.subscription_plan
    state.access_token = data.access_token

    // hash each key and value of user object
    const hashedUSerObj = {}
    for (const [key, value] of Object.entries(user)) {
      const hashedKey = hash(key)
      const hashedVal = hash(value)
      hashedUSerObj[`${hashedKey}`] = hashedVal
    }

    // hash each key and value of subscription_plan obj
    const hashedSubscriptionPlanObj = {}
    for (const [key, value] of Object.entries(data.subscription_plan)) {
      const hashedKey = hash(key)
      const hashedVal = hash(value)
      hashedSubscriptionPlanObj[`${hashedKey}`] = hashedVal
    }

    localStorage.setItem(hash('entity'), JSON.stringify(hashedUSerObj))
    localStorage.setItem(
      hash('subscription_plan'),
      JSON.stringify(hashedSubscriptionPlanObj)
    )
    localStorage.setItem(hash('access_token'), data.access_token)
  },
  clearAuthCredentials(state) {
    state.entity = {}
    state.subscription_plan = {}

    // remove from localStorage
    localStorage.removeItem(unhash('entity'))
    localStorage.removeItem(unhash('subscription_plan'))
    localStorage.removeItem(unhash('access_token'))
  },
}
