<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn color="success" :loading="loading" @click="registerLink">Register</v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-alert type="error" v-if="error !== ''">
              {{ error }}
              <v-template v-if="user_id !== ''">
                <v-btn
                  color="primary"
                  text
                  dark
                  :loading="loading"
                  @click="resendVerification"
                >
                  Resend Verification Email
                </v-btn>
              </v-template>
            </v-alert>
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

              <v-text-field
                id="password"
                v-model.trim="password"
                :error-messages="passwordErrors"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                @keyup.enter="login"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              :loading="loading"
              @click="forgotPasswordLink"
              >Forgot Password?</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn color="primary" text :loading="loading" @click="login"
              >Login</v-btn
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
  layout: 'blank',
  mixins: [validationMixin],
  data: () => ({
    loading: false,
    error: '',
    user_id: '',
    email: '',
    password: '',
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
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
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
  },
  methods: {
    registerLink() {
      this.$router.push('/register')
    },
    forgotPasswordLink() {
      this.$router.push('/forgot-password')
    },
    login() {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.loading = true
        this.$store
          .dispatch('auth/login', {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$router.push('/admin/dashboard')
          })
          .catch((err) => {
            this.error = err.response.data.message
            this.user_id = err.response.data.user_id
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    resendVerification() {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: `${process.env.NUXT_ENV_API_URL}/resend-verification-email/${this.user_id}`,
      })
        .then((res) => {
          this.$store.commit('notifSnackbar', {
            text: res.data,
            color: 'success',
          })
        })
        .catch((err) => {
          this.$store.commit('notifSnackbar', {
            text: err.response.data,
            color: 'error',
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style></style>
