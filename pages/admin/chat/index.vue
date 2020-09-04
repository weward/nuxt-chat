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
      key: '6f7bd2bf7b1dbb5828a8',
      cluster: 'ap1',
      encrypted: true,
    })
  },
}
</script>

<style></style>
