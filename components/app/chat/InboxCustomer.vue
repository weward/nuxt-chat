<template>
  <div>
    <div
      :class="[
        { secondary: cus.chat_log_id === activeCustomerNode },
        'node-customer',
      ]"
      v-for="cus in data"
      :key="cus.chat_log_id"
      @click="inboxSelect(cus.chat_log_id)"
    >
      <span class="node-customer-name">
        {{ cus.name }}
      </span>
      <v-spacer></v-spacer>
      <span><v-icon v-if="cus.unread" color="red lighten-1">mdi-alert-box</v-icon></span>
    </div>
  </div>
</template>

<script>
import { hash } from '~/assets/utils'
export default {
  name: 'InboxCustomer',
  props: ['data'],
  data: () => ({
    activeCustomerNode: 0,
  }),
  methods: {
    inboxSelect(chatLogId) {
      this.$store
        .dispatch('chat/setActiveCustomerNode', chatLogId)
        .then((res) => {
          window.Echo.leave(`chat.${chatLogId}`)
          window.Echo.private(`chat.${chatLogId}`).listen(
            '.SendMessage',
            (e) => {
              if (e.from === 0) {
                this.$store.commit('chat/appendMessage', e)
              }
            }
          )

          this.activeCustomerNode = this.$store.state.chat.activeCustomerNode
        })
        .catch(() => {
          this.activeCustomerNode = 0
          this.$store.commit('notifSnackbar', {
            text: 'No message to show',
          })
        })
    },
  },
}
</script>

<style>
.node-customer {
  border: 1px solid #d0d0d0;
  padding: 15px;
  display: flex;
  flex-direction: row;
}
</style>
