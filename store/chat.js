export const state = () => ({
  showQueue: false,
  activeCustomerNode: 0,
  messages: {},
})

export const actions = {
  setActiveCustomerNode({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const messages = [
        {
          chat_app_id: 1,
          customer: 'abc@abc.com',
          agent_id: 1,
          messages: [
            {
              id: 1,
              text: 'lorem ipsum!',
              from_flag: 1,
            },
            {
              id: 2,
              text: 'dolor sit amet',
              from_flag: 0,
            },
            {
              id: 3,
              text: 'ASD asd asd dasd?',
              from_flag: 1,
            },
            {
              id: 4,
              text: 'Yes.',
              from_flag: 0,
            },
          ],
        },
        {
          chat_app_id: 2,
          customer: 'xyz@xyz.com',
          agent_id: 2,
          messages: [
            {
              id: 5,
              text: 'lorem ipsum!',
              from_flag: 1,
            },
            {
              id: 6,
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              from_flag: 0,
            },
            {
              id: 7,
              text: 'ASD asd asd dasd?',
              from_flag: 1,
            },
            {
              id: 8,
              text: 'Yes.',
              from_flag: 0,
            },
            {
              id: 9,
              text: 'Okay. Then?',
              from_flag: 1,
            },
            {
              id: 10,
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              from_flag: 0,
            },
            {
              id: 11,
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              from_flag: 1,
            },
            {
              id: 12,
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              from_flag: 0,
            },
          ],
        },
      ]
      try {
        if (payload > 0) {
          let val = messages.filter((msg) => msg.chat_app_id === payload)
          commit('setActiveCustomerNode', payload)

          val = val.length > 0 ? val[0] : {}
          commit('setMessages', val)
          if (typeof val.messages === 'undefined') {
            reject(new Error('Failed to fetch messages!'))
          }
          resolve()
        }
      } catch (err) {
        reject(err)
      }
    })
  },
}

export const mutations = {
  toggleQueue(state) {
    state.showQueue = !state.showQueue
  },
  setActiveCustomerNode(state, data) {
    state.activeCustomerNode = data
  },
  setMessages(state, data) {
    state.messages = data
  },
}
