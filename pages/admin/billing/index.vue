<template>
  <v-layout light justify-center>
    <v-row>
      <v-col cols="6">
        <v-card class="mx-auto" outlined  v-if="!loading">
          <v-list-item three-line v-if="!loading">
            <v-list-item-content>
              <div class="overline mb-4">SUBSCRIPTION PLAN</div>
              <v-list-item-title class="headline mb-1"
                >Default</v-list-item-title
              >
              <v-list-item-subtitle
                >Trial ends at September 11, 2020</v-list-item-subtitle
              >
              <v-list-item-subtitle><b>20</b> Users</v-list-item-subtitle>
              <v-list-item-subtitle><b>4</b> Applications</v-list-item-subtitle>
              <v-list-item-subtitle
                ><b>$1,200.00</b> Billable this month</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>
        </v-card>

        <v-card class="mx-auto mt-2" outlined v-if="!loading">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Payment Method</div>
              <div v-if="company === null">
                <v-list-item-title class="headline mb-1"
                  >Setup Payment Method</v-list-item-title
                >
                <v-list-item-subtitle
                  >This is where you setup your payment
                  method.</v-list-item-subtitle
                >
              </div>
              <div v-if="company !== null">
                <v-list-item-subtitle
                  >Card Brand <b>{{ company.card_brand }}</b></v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Card Ending in <b>{{ company.card_last_four }}</b></v-list-item-subtitle
                >
              </div>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text @click="changePaymentMethod">Change Payment Method</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="mx-auto" outlined v-if="!loading">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1"
                >Headline 5</v-list-item-title
              >
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text>Button</v-btn>
            <v-btn text>Button</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="mx-auto mt-2" outlined v-if="!loading">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1"
                >Headline 5</v-list-item-title
              >
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text>Button</v-btn>
            <v-btn text>Button</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  middleware: 'authenticated',
  layout: 'admin',
  data: () => ({
    loading: true,
    company: null,
    stripe_customer: {
      payment_method: null,
    },
  }),
  components: {},
  methods: {
    changePaymentMethod() {
      this.$router.push('billing/payment-method')
    }
  },
  fetch() {
    this.$store
      .dispatch('billing/getStripe')
      .then(() => {
        this.stripe_customer = this.$store.state.billing.stripe_customer
        this.company = this.$store.state.billing.company
        
        this.loading = false
      })
      .catch((err) => {
        this.$store.commit('notifSnackbar', {
          text: err,
        })
      })
  },
}
</script>

<style></style>
