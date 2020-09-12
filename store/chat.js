import { hash, unhash } from '~/assets/utils'

export const state = () => ({
  showQueue: false,
  activeCustomerNode: 0,
  nodeWithNewMessage: 0,
  messages: [],
  customers: [],
})

export const actions = {
  initInbox({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios({
        method: 'GET',
        url: `${process.env.NUXT_ENV_API_URL}/admin/chat/init-inbox`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(hash('access_token'))}`,
        },
      })
        .then((res) => {
          // store data on localStorage(separated per customer identified by chat_log_id)
          commit('initMessageStorage', res.data)
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.response.data)
        })
    })
  },
  setActiveCustomerNode({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      try {
        const messages = state.messages.filter(
          (msg) => msg.chat_log_id === payload
        )

        commit('setMessages', messages)
        commit('setActiveCustomerNode', payload)

        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  addNewCustomer({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios({
        method: 'GET',
        url: `${process.env.NUXT_ENV_API_URL}/admin/chat/add-new-customer`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(hash('access_token'))}`,
        },
      })
        .then((res) => {
          commit('addCustomerToList', res.data)

          resolve(res.data)
        })
        .catch((err) => {
          reject(err.response.data)
        })
    })
  },
  sendMessage({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios({
        method: 'POST',
        url: `${process.env.NUXT_ENV_API_URL}/admin/chat/send-message`,
        data: {
          message: payload.message,
          from: 1,
          channel_name: `chat.${payload.chat_log_id}`,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(hash('access_token'))}`,
        },
      })
        .then((res) => {
          commit('appendMessage', {
            time: res.data.time,
            chat_log_id: res.data.chat_log_id,
            customer: res.data.customer,
            agent_id: res.data.user_id,
            from: 1,
            message: res.data.message,
          })

          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject(err.response.data)
        })
    })
  },
}

export const mutations = {
  toggleQueue(state) {
    state.showQueue = !state.showQueue
  },
  initMessageStorage(state, data) {
    // get chat log ids as key for localStorage messages_{chat_log_id}
    const ids = data.chatLogs.map((log) => log.chat_log_id)
    // store messages in localStorage
    ids.forEach((chatLogId) => {
      const messages = data.messages.filter(
        (msg) => msg.chat_log_id === chatLogId
      )

      localStorage.setItem(
        hash(`messages_${chatLogId}`),
        JSON.stringify(messages)
      )
    })
  },
  setActiveCustomerNode(state, data) {
    state.activeCustomerNode = data
  },
  setMessages(state, data) {
    state.messages = data
  },
  addCustomerToList(state, data) {
    state.customers.unshift({
      chat_log_id: data.chat_log_id,
      email: data.email,
      unread: true,
    })
  },
  appendMessage(state, payload) {
    // get messages(for this channel) on localStorage
    let messages = JSON.parse(
      localStorage.getItem(hash(`messages_${payload.chat_log_id}`))
    )

    // on first instance, when agent adds customer, and messages first the customer,
    // there is no message in the localStorage yet
    messages = messages === null ? [] : messages

    messages.push({
      myuuid: payload.time,
      chat_log_id: payload.chat_log_id,
      customer: payload.customer,
      agent_id: payload.agent_id,
      from: payload.from,
      message: payload.message,
    })
    // store this channel's mmessages in localStorage
    localStorage.setItem(
      hash(`messages_${payload.chat_log_id}`),
      JSON.stringify(messages)
    )
    // set store state
    if (state.activeCustomerNode === payload.chat_log_id) {
      state.messages = messages
    }
    // if has new message from customer
    if (payload.from === 0) {
      // rearrange inbox customer list
      state.nodeWithNewMessage = payload.chat_log_id
    } else {
      // reset
      state.nodeWithNewMessage = 0
    }
  },
}
