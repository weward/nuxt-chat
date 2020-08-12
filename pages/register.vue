<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Registration Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form id="registration-form">
              <v-text-field
                v-model.trim="email"
                :error-messages="emailErrors"
                label="Email *"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>

              <v-text-field
                id="company"
                v-model.trim="company"
                label="Company"
                name="company"
                prepend-icon="mdi-office-building-outline"
                type="text"
              ></v-text-field>

              <v-text-field
                id="password"
                v-model.trim="password"
                :error-messages="passwordErrors"
                label="Password *"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>

              <v-text-field
                id="confirm_password"
                v-model.trim="confirm_password"
                :error-messages="confirmPasswordErrors"
                label="Confirm Password *"
                name="confirm_password"
                prepend-icon="mdi-lock"
                type="password"
                @input="$v.confirm_password.$touch()"
                @blur="$v.confirm_password.$touch()"
              ></v-text-field>

              <v-checkbox
                v-model="terms"
                required
                @input="$v.terms.$touch()"
                @blur="$v.terms.$touch()"
              >
                <template slot="append"
                  ><i>Do you agree to the<span v-html="termsLabel"></span></i
                ></template>
              </v-checkbox>
              <div v-if="this.$v.terms.$dirty && !$v.terms.sameAs" class="v-messages theme--light error--text" role="alert">
                <div class="v-messages__wrapper">
                  <div class="v-messages__message">
                    To continue, you must agree to the terms and conditions.
                  </div>
                </div>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="cancelLink">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submit">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  layout: 'blank',
  mixins: [validationMixin],
  data: () => ({
    email: '',
    company: '',
    password: '',
    confirm_password: '',
    terms: false,
    termsLabel: '<a href="/terms-and-conditions">terms and conditions</a>?',
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirm_password: {
      required,
      sameAs: sameAs('password'),
    },
    terms: {
      sameAs: sameAs(() => true),
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
      !this.$v.password.minLength &&
        errors.push('Must be at least 8 characters long.')
      return errors
    },
    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.confirm_password.$dirty) return errors
      !this.$v.confirm_password.required &&
        errors.push('Confirm Password field is required.')
      !this.$v.confirm_password.sameAs && errors.push('Passwords do not match.')
      return errors
    },
    termsErrors() {
      const errors = ''
      if (!this.$v.terms.$dirty) return errors
      if (!this.$v.terms.sameAs) {
        errors = 'To continue, you must agree to the terms and conditions.'
      }
      return errors
    },
  },
  methods: {
    cancelLink() {
      this.$router.push('/login')
    },
    submit() {
      this.$v.$touch()
      if (!this.$v.$error) {
      }
    },
  },
}
</script>

<style>
#registration-form
  > div.v-input.theme--light.v-input--selection-controls.v-input--checkbox
  > div.v-input__control {
  flex-grow: 0;
  width: 25px;
  margin-top: -4px;
}
</style>
