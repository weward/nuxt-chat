<template>
  <v-layout light justify-center>
    <v-row>
      <v-col cols="12">
        <Conversations v-if="!showQueue"></Conversations>
        <Queue v-if="showQueue"></Queue>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import Conversations from '~/components/app/chat/Conversations'
import Queue from '~/components/app/chat/Queue'

export default {
  middleware: 'authenticated',
  layout: 'admin',
  components: {
    Conversations,
    Queue,
  },
  data: () => ({
    showQueue: false,
  }),
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'chat/toggleQueue') {
        this.showQueue = state.chat.showQueue
      }
    })
  },
  mounted() {
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: process.env.NUXT_ENV_PUSHER_KEY,
      cluster: process.env.NUXT_ENV_PUSHER_CLUSTER,
      encrypted: true,
      // authEndpoint: '/api/broadcasting/auth'
      wsHost: process.env.NUXT_ENV_WEBSOCKET_SERVER_HOST,
      wsPort: process.env.NUXT_ENV_WEBSOCKET_SERVER_PORT,
      forceTLS: false,
      disableStats: true,
    })
 
    // window.Echo.private(`test-channel`).listen('SendMessage', (e) => {
    window.Echo.channel(`test-channel`).listen('.SendMessage', (e) => {
      console.log(e.message)
    })
  },
}
</script>

<style></style>
