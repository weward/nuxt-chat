<template>
  <v-row>
    <v-col cols="12" v-if="this.$vuetify.breakpoint.mdAndUp">
      <h5>
        <v-btn class="primary" @click="addNewCustomer">Add Customer</v-btn>
        <v-btn class="primary" @click="toggleQueue">Show Queue</v-btn>
      </h5>
    </v-col>
    <v-col
      cols="12"
      v-if="this.$vuetify.breakpoint.smAndDown"
      class="conv-actions pb-0"
    >
      <div class="conv-customers">
        <v-select
          :items="customers"
          label="Customers"
          item-text="name"
          item-value="chat_app_id"
          dense
          v-model="selectedCustomer"
        ></v-select>
      </div>
      <v-spacer />
      <div class="conv-menu">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
              O
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in menu" :key="index" @click="selectedMenu(item.id)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-col>
    <!-- <v-col cols="12">
      <v-row> -->
    <v-col v-if="this.$vuetify.breakpoint.mdAndUp" cols="4">
      <InboxCustomer :data="customers"></InboxCustomer>
    </v-col>
    <v-col
      :cols="$vuetify.breakpoint.mdAndUp ? '8' : '12'"
      :class="[{ 'pt-0': this.$vuetify.breakpoint.smAndDown }]"
    >
      <InboxMessage></InboxMessage>
    </v-col>
    <!-- </v-row>
    </v-col> -->
  </v-row>
</template>

<script>
import InboxCustomer from '~/components/app/chat/InboxCustomer'
import InboxMessage from '~/components/app/chat/InboxMessage'

export default {
  name: 'Converastions',
  components: {
    InboxCustomer,
    InboxMessage,
  },
  data: () => ({
    selectedCustomer: 0,
    menu: [
      {
        id: 1,
        title: 'Show Queue',
      },
      {
        id: 2,
        title: 'Add Customer',
      },
    ],
    customers: [
      {
        chat_app_id: 1,
        name: 'Customer A',
        unread: true,
      },
      {
        chat_app_id: 2,
        name: 'Customer B',
        unread: true,
      },
      {
        chat_app_id: 7,
        name: 'Customer G',
        unread: true,
      },
      {
        chat_app_id: 3,
        name: 'Customer C',
        unread: false,
      },
      {
        chat_app_id: 4,
        name: 'Customer D',
        unread: false,
      },
      {
        chat_app_id: 5,
        name: 'Customer E',
        unread: false,
      },
      {
        chat_app_id: 6,
        name: 'Customer F',
        unread: false,
      },
    ],
  }),
  methods: {
    toggleQueue() {
      this.$store.commit('chat/toggleQueue')
    },
    addNewCustomer() {},
    selectedMenu(menuId) {
      switch (menuId) {
        case 1 : 
          this.$store.commit('chat/toggleQueue')
          break;
        case 2 : 
          // this.$store.commit('chat/toggleQueue')
          break;
        
        default:
          this.$router.push('dashboard')

      }
    }
  },
  watch: {
    selectedCustomer() {
      console.log(this.selectedCustomer)
      this.$store
        .dispatch('chat/setActiveCustomerNode', this.selectedCustomer)
        .then((res) => {
          // dont put code for setting the message here...
          // makee a subscribe function inside InboxMessage instead
          // this is for stoping the loading indicator only
        })
        .catch(() => {
          this.$store.commit('notifSnackbar', {
            text: 'Failed to fetch message',
          })

          // this.$store.commit('setMessages', [])
        })
    },
  },
}
</script>

<style>
.conv-actions {
  display: flex;
}
</style>
