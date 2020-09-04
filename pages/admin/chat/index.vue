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
}
</script>

<style></style>
