<template>
  <div>
    <v-snackbar
      v-model="show"
      :timeout="timeout"
      :color="color"
      :multi-line="true"
      :top="true"
    >
      {{ text }}
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
  data: () => ({
    show: false,
    timeout: '',
    color: '',
    text: '',
  }),
  methods: {
    hideSnackbar() {
      this.show = false
    },
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'notifSnackbar') {
        this.text = state.notifSnackbar.text
        this.timeout = state.notifSnackbar.timeout
        this.color = state.notifSnackbar.color
        this.show = true
      }
    })
  }
}
</script>

<style></style>
