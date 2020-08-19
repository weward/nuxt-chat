<template>
  <div>
    <v-snackbar
      v-model="$store.state.notifSnackbar.show"
      :timeout="$store.state.notifSnackbar.timeout"
      color="primary"
      :multi-line="true"
      :top="true"
    >
      {{ $store.state.notifSnackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="hideSnackbar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  methods: {
    hideSnackbar() {
      this.$store.commit('notifSnackbar', { show: false })
    }
  }
}
</script>

<style></style>
