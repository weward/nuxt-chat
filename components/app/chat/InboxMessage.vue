<template>
  <div>
    <div v-if="showMessages === true" class="msg-container" ref="messages">
      <div
        v-for="msg in messages"
        :key="msg.myuuid"
        :class="[
          { 'msg-bubble-you': msg.from === 1 },
          { 'msg-bubble-customer': msg.from === 0 },
          'msg-bubble',
        ]"
      >
        <b
          ><span class="sender-name">{{
            msg.from === 0 ? msg.customer : 'You'
          }}</span></b
        ><br />
        <span class="tab">&nbsp;</span>{{ msg.message }}
      </div>
    </div>
    <div v-if="showMessages === true" class="msg-actions">
      <div class="msg">
        <v-text-field
          ref="inputmessage"
          v-model="message"
          placeholder="Type your message here ..."
          @keyup.enter="sendMessage"
          :disabled="loading"
        ></v-text-field>
      </div>
      <div class="msg-send">
        <v-btn
          class="primary"
          :block="this.$vuetify.breakpoint.smAndDown"
          @click="sendMessage"
          >Send</v-btn
        >
      </div>
    </div>
    <div v-if="showMessages === false" class="msg-container centered-parent">
      <div class="centered-content">
        No messages to show
      </div>
      <v-spacer></v-spacer>
    </div>
  </div>
</template>

<script>
import { hash } from '~/assets/utils'
export default {
  name: 'InboxMessage',
  data: () => ({
    loading: false,
    messages: [],
    message: '',
    showMessages: false,
  }),
  methods: {
    sendMessage() {
      this.loading = true
      this.$store
        .dispatch('chat/sendMessage', {
          message: this.message,
          chat_log_id: this.$store.state.chat.activeCustomerNode,
        })
        .then(() => {
          this.message = ''
          // set notifier to unread
          this.$store.commit(
            'chat/setActiveCustomerNode',
            this.$store.state.chat.activeCustomerNode
          )
        })
        .catch(() => {
          this.$store.commit('notifSnackbar', {
            text: 'Failed.',
          })
        })
        .finally(() => {
          this.loading = false
          // refocus on textbox
          this.$nextTick(() => this.$refs.inputmessage.focus())
        })
    },
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'chat/setMessages') {
        this.messages = state.chat.messages
      }
      if (mutation.type === 'chat/appendMessage') {
        this.messages = state.chat.messages
      }
      if (mutation.type === 'chat/setActiveCustomerNode') {
        this.showMessages = state.chat.activeCustomerNode !== null
        if (
          localStorage.getItem(
            hash(`messages_${state.chat.activeCustomerNode}`)
          ) !== null
        ) {
          // set component state
          this.messages = JSON.parse(
            localStorage.getItem(
              hash(`messages_${state.chat.activeCustomerNode}`)
            )
          )
          // set store state
          this.$store.commit('chat/setMessages', this.messages)
        }
      }
    })
  },
  updated() {
    // focus on the latest message
    if (this.messages.length > 0) {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      // save to local storage all messages of this channnel
      localStorage.setItem(
        hash(`messages_${this.$store.state.chat.activeCustomerNode}`),
        JSON.stringify(this.messages)
      )
    }
  },
}
</script>

<style scoped>
.centered-parent {
  display: flex;
  flex-direction: column-reverse;
}
.centered-content {
  flex-grow: 1 !important;
  text-align: center;
}
.tab {
  margin-left: 15px;
}
.sender-name {
  font-size: 14px;
}
.msg-container {
  min-height: 61vh;
  max-height: 61vh;
  overflow: auto;
  border: 1px solid #d0d0d0;
  padding: 5px;
}
.msg-bubble {
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
}
.msg-bubble-customer {
}
.msg-bubble-you {
}
</style>
