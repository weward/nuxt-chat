<template>
  <div>
    <div v-if="typeof nodes.messages !== 'undefined'" class="msg-container">
      <div
        v-for="msg in nodes.messages"
        :key="msg.id"
        :class="[
          { 'msg-bubble-you': msg.from_flag === 1 },
          { 'msg-bubble-customer': msg.from_flag === 0 },
          'msg-bubble',
        ]"
      >
        <b
          ><span class="sender-name">{{
            msg.from_flag === 0 ? nodes.customer : 'You'
          }}</span></b
        ><br />
        <span class="tab">&nbsp;</span>{{ msg.text }}
      </div>
    </div>
    <div v-if="typeof nodes.messages !== 'undefined'" class="msg-actions">
      <div class="msg">
        <v-textarea
          :rows="1"
          placeholder="Type your message here ..."
        ></v-textarea>
      </div>
      <div class="msg-send">
        <v-btn class="primary" :block="this.$vuetify.breakpoint.smAndDown">Send</v-btn>
      </div>
    </div>
    <div v-if="typeof nodes.messages === 'undefined'" class="msg-container centered-parent">
      <div class="centered-content">
        No messages to show
      </div>
      <v-spacer></v-spacer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InboxMessage',
  data: () => ({
    nodes: '',
  }),
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'chat/setMessages') {
        this.nodes = state.chat.messages
      }
    })
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
