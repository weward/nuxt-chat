<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <h5>Customers ['Add New' button] <v-btn class="primary" @click="toggleQueue">"Show Conversations"</v-btn></h5>
          List of 10 Customers waiting in queue 
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Queue',
  methods: {
    toggleQueue() {
      this.$store.commit('chat/toggleQueue')
    }
  }
}
</script>

<style>

</style>