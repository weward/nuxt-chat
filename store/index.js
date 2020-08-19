export const state = () => ({
  loading: false,
  notifSnackbar: {
    show: false,
    timeout: 5000,
    color: 'primary',
    text: '',
  },
})

export const mutations = {
  loading(state, bool) {
    state.loading = bool
  },
  notifSnackbar(state, data) {
    state.notifSnackbar.show =
      typeof data.show !== 'undefined' ? data.show : false
    state.notifSnackbar.timeout =
      typeof data.timeout !== 'undefined' ? data.timeout : 5000
    state.notifSnackbar.text = typeof data.text !== 'undefined' ? data.text : ''
    state.notifSnackbar.color =
      typeof data.color !== 'undefined' ? data.color : 'primary'
  },
}
