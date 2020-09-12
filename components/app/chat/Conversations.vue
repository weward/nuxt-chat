<template>
  <v-row>
    <v-col cols="12" v-if="this.$vuetify.breakpoint.mdAndUp">
      <h5>
        <v-btn class="primary" @click="addNewCustomer">Add Customer</v-btn>
        <v-btn class="primary" @click="toggleQueue">Show Queue</v-btn>
      </h5>
    </v-col>
    <v-col
      cols="12"
      v-if="this.$vuetify.breakpoint.smAndDown"
      class="conv-actions pb-0"
    >
      <div class="conv-customers">
        <v-select
          :items="customers"
          label="Customers"
          item-text="name"
          item-value="chat_app_id"
          dense
          v-model="selectedCustomer"
        ></v-select>
      </div>
      <v-spacer />
      <div class="conv-menu">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
              O
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in menu"
              :key="index"
              @click="selectedMenu(item.id)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-col>
    <!-- <v-col cols="12">
      <v-row> -->
    <v-col v-if="this.$vuetify.breakpoint.mdAndUp" cols="4">
      <InboxCustomer :data="customers"></InboxCustomer>
    </v-col>
    <v-col
      :cols="$vuetify.breakpoint.mdAndUp ? '8' : '12'"
      :class="[{ 'pt-0': this.$vuetify.breakpoint.smAndDown }]"
    >
      <InboxMessage></InboxMessage>
    </v-col>
    <!-- </v-row>
    </v-col> -->
  </v-row>
</template>

<script>
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import InboxCustomer from '~/components/app/chat/InboxCustomer'
import InboxMessage from '~/components/app/chat/InboxMessage'
import { hash } from '~/assets/utils'

export default {
  name: 'Converastions',
  components: {
    InboxCustomer,
    InboxMessage,
  },
  data: () => ({
    selectedCustomer: 0,
    menu: [
      {
        id: 1,
        title: 'Show Queue',
      },
      {
        id: 2,
        title: 'Add Customer',
      },
    ],
    customers: [],
  }),
  methods: {
    initInbox() {
      this.$store
        .dispatch('chat/initInbox')
        .then((res) => {
          this.customers = res.chatLogs
          if (res.chatLogs.length > 0) {
            res.chatLogs.forEach((chatLog) => {
              // SUBSCRIBE TO CHANNEL
              window.Echo.leave(`chat.${chatLog.chat_log_id}`)
              window.Echo.private(`chat.${chatLog.chat_log_id}`).listen(
                '.SendMessage',
                (e) => {
                  if (e.from === 0) {
                    this.$store.commit('chat/appendMessage', e)
                  }
                }
              )

              // UPDATE UNREAD NOTIFIER
              const messages = res.messages.filter(
                (msg) => msg.chat_log_id === chatLog.chat_log_id
              )
              // get old stored messages for comparison
              const oldStoredMessages = JSON.parse(
                localStorage.getItem(hash(`messages_${chatLog.chat_log_id}`))
              )
              const oldStoredMessagesCount = oldStoredMessages.length
              const messagesCount = messages.length
              // update status: new/unread message notifier
              if (messagesCount > oldStoredMessagesCount) {
                this.customers
                  .filter((cus) => cus.chat_log_id === chatLog.chat_log_id)
                  .map((cus) => (cus.unread = true))
              }
            })
          }
        })
        .catch(() => {
          this.$store.commit('notifSnackbar', {
            text: 'Failed to fetch inbox.',
          })
        })
    },
    toggleQueue() {
      this.$store.commit('chat/toggleQueue')
    },
    addNewCustomer() {
      this.$store
        .dispatch('chat/addNewCustomer')
        .then((res) => {
          if (res !== null) {
            this.customers.unshift({
              chat_log_id: res.chat_log_id,
              name: res.email,
              unread: false,
            })
          }
          window.Echo.leave(`chat.${res.chat_log_id}`)
          window.Echo.private(`chat.${res.chat_log_id}`).listen(
            '.SendMessage',
            (e) => {
              if (e.from === 0) {
                this.$store.commit('chat/appendMessage', e)
              }
            }
          )
        })
        .catch((err) => {
          this.$store.commit('notifSnackbar', {
            text: err,
          })
        })
    },
    selectedMenu(menuId) {
      switch (menuId) {
        case 1:
          this.$store.commit('chat/toggleQueue')
          break
        case 2:
          // this.$store.commit('chat/toggleQueue')
          break

        default:
          this.$router.push('dashboard')
      }
    },
  },
  watch: {
    selectedCustomer() {
      this.$store
        .dispatch('chat/setActiveCustomerNode', this.selectedCustomer)
        .then((res) => {
          // dont put code for setting the message here...
          // this is for stoping the loading indicator only
        })
        .catch(() => {
          this.$store.commit('notifSnackbar', {
            text: 'Failed to fetch message',
          })
        })
    },
  },
  async mounted() {
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: process.env.NUXT_ENV_PUSHER_KEY,
      cluster: process.env.NUXT_ENV_PUSHER_CLUSTER,
      encrypted: true,
      wsHost: process.env.NUXT_ENV_WEBSOCKET_SERVER_HOST,
      wsPort: process.env.NUXT_ENV_WEBSOCKET_SERVER_PORT,
      forceTLS: false,
      disableStats: true,
      authEndpoint: `${process.env.NUXT_ENV_API_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(hash('access_token'))}`,
        },
      },
    })

    await this.initInbox()

    await this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'chat/appendMessage') {
        // UPDATE NODE W/ NEW MESSAGE TO TOP OF THE LIST
        let customers = this.customers
        let customerWithNewMessage = customers.filter(
          (cus) => cus.chat_log_id === state.chat.nodeWithNewMessage
        )
        if (customerWithNewMessage.length > 0) {
          customerWithNewMessage = customerWithNewMessage[0]
          customers = customers.filter(
            (cus) => cus.chat_log_id !== state.chat.nodeWithNewMessage
          )
          this.customers = customers
          // Put to Top of the list with unread notifier
          this.customers.unshift({
            chat_log_id: customerWithNewMessage.chat_log_id,
            name: customerWithNewMessage.name,
            unread: true,
          })

          // play notification sound
          const sound = new Audio(
            require('@/assets/notificationbell.mp3')
          ).play()
        }
      }

      if (mutation.type === 'chat/setActiveCustomerNode') {
        // set unread ticker of selected node to false
        this.customers
          .filter((cus) => cus.chat_log_id === state.chat.activeCustomerNode)
          .map((cus) => (cus.unread = false))
      }
    })
  },
  created() {},
}
</script>

<style>
.conv-actions {
  display: flex;
}
</style>
