<template>
  <div>
    <div
      :class="[
        { secondary: cus.chat_app_id === activeCustomerNode },
        'node-customer',
      ]"
      v-for="cus in data"
      :key="cus.chat_app_id"
      @click="inboxSelect(cus.chat_app_id)"
    >
      <span class="node-customer-name">
        {{ cus.name }}
      </span>
      <v-spacer></v-spacer>
      <span>{{ cus.unread ? '[!]' : '' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InboxCustomer',
  props: ['data'],
  data: () => ({
    activeCustomerNode: 0,
  }),
  methods: {
    inboxSelect(chatAppId) {
      // this.$refs[`node-${chatAppId}`];
      // this.activeCustomerNode = chatAppId
      this.$store
        .dispatch('chat/setActiveCustomerNode', chatAppId)
        .then((res) => {
          this.activeCustomerNode = this.$store.state.chat.activeCustomerNode
          // dont put code for setting the message here...
          // makee a subscribe function inside InboxMessage instead
          // this is for stoping the loading indicator only
        })
        .catch(() => {
          this.activeCustomerNode = 0
          this.$store.commit('notifSnackbar', {
            text: 'Failed to fetch message',
          })

          // this.$store.commit('setMessages', [])
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
