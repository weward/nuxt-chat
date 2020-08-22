<template>
  <v-layout light column justify-center align-center>
    <!-- <v-flex xs12 sm8 md6> </v-flex> -->
    dashboard
  </v-layout>
</template>

<script>
export default {
  middleware: 'authenticated',
  layout: 'admin',
  components: {},
}
</script>
