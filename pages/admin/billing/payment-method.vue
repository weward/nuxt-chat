<template>
  <v-layout light justify-center>
    <v-row>
      <v-card class="mx-auto" outlined :loading="loading">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Update Payment Method</div>

            <v-text-field
              color="success"
              placeholder="Card Holder's Name"
              v-model="name"
            ></v-text-field>

            <!-- Stripe Elements Placeholder -->
            <div ref="card"></div>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text :loading="loading" @click="updateBtn">Update</v-btn>
          <v-btn text :loading="loading" @click="cancelBtn">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  middleware: 'authenticated',
  layout: 'admin',
  data: () => ({
    loading: false,
    name: '',
    stripe: '',
    cardElement: '',
  }),
  methods: {
    async updateBtn() {
      this.loading = true
      try {
        const clientSecret = this.$store.state.billing.intent.client_secret

        const { setupIntent, error } = await this.stripe.confirmCardSetup(
          clientSecret,
          {
            payment_method: {
              card: this.cardElement,
              billing_details: { name: this.name },
            },
          }
        )

        if (error) {
          // Display "error.message" to the user...
          this.$store.commit('notifSnackbar', {
            text: 'Failed verification. Please try again.',
            color: 'error',
          })
          
          this.loading = false
        } else {
          // The card has been verified successfully...
          this.$store
            .dispatch('billing/setupPaymentMethod', setupIntent.payment_method)
            .then(() => {
              this.$router.push('../billing')
              this.$store.commit('notifSnackbar', {
                text: 'You have successfully updated your payment method.',
                color: 'success',
              })
            })
            .catch((err) => {
              this.$store.commit('notifSnackbar', {
                text: err,
                color: 'error',
              })

              this.$router.push('../billing')
            })
            .finally(() => {
              this.loading = false
            })
        }
      } catch (err) {
        this.$store.commit('notifSnackbar', {
          text: 'Failed verification. Please try again.',
          color: 'error',
        })

        this.$router.push('../billing')
        this.loading = false
      }
    },
    cancelBtn() {
      this.$router.push('../billing')
    },
  },
  mounted() {
    const stripe = window.Stripe(process.env.NUXT_ENV_STRIPE_PK)

    this.stripe = stripe

    const elements = stripe.elements()
    const cardElement = elements.create('card', { hidePostalCode: true })

    this.cardElement = cardElement

    cardElement.mount(this.$refs.card)
  },
}
</script>

<style></style>
