<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Recover Password</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model.trim="email"
                :error-messages="emailErrors"
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text :loading="loading" @click="cancelLink"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn color="primary" text :loading="loading" @click="request"
              >Request</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  middleware: 'guest',
  layout: 'blank',
  mixins: [validationMixin],
  data: () => ({
    loading: false,
    email: '',
  }),
  validations: {
    email: {
      required,
      email,
    },
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be a valid email.')
      !this.$v.email.required && errors.push('Email is required.')
      return errors
    },
  },
  methods: {
    cancelLink() {
      this.$router.push('/login')
    },
    request() {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.loading = true
        this.$axios({
          method: 'POST',
          url: `${process.env.NUXT_ENV_API_URL}/forgot-password`,
          data: {
            email: this.email,
          },
        })
          .then((res) => {
            this.$router.push('/login')
            this.$store.commit('notifSnackbar', {
              text: res.data,
              show: true,
            })
          })
          .catch((err) => {
            this.$store.commit('notifSnackbar', {
              text: err.response.data,
              show: true,
            })
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>

<style></style>
