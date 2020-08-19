export const state = () => ({
  entity: {
    email: '',
    company: '',
    password: '',
    confirm_password: '',
  },
})

export const actions = {
  login({ dispatch }, payload) {
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
          // this.$router.push('/admin/dashboard')
          resolve()
        })
        .catch((err) => {
          // this.$store.commit('notifSnacbar', {
          //   text: err.response.data,
          // })
          reject(err)
        })
    })
  },
  logout() {},
}
