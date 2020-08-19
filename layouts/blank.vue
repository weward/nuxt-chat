<template>
  <v-app>
    <v-main>
      <nuxt />
      <notifSnackbar></notifSnackbar>
    </v-main>
  </v-app>
</template>
<script>
import notifSnackbar from '~/components/app/notifSnackbar'

export default {
  layout: 'blank',
  components: {
    notifSnackbar,
  },
}
</script>

<style></style>
