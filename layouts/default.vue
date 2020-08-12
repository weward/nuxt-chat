<template>
  <v-app>
    <v-app-bar dark :clipped-left="clipped" fixed app color="primary">
      <v-toolbar-title v-text="title"/>
      <v-spacer />
      <nuxt-link
        to="/"
        :class="[
          { 'home-nav-link-active': $nuxt.$route.path == '/' },
          'home-nav-link',
          'font-weight-bold',
        ]"
      >
        Home
      </nuxt-link>
      <nuxt-link to="/about"
        :class="[
          { 'home-nav-link-active': $nuxt.$route.path == '/about' },
          'home-nav-link',
          'font-weight-bold',
        ]">
        About
      </nuxt-link>
      <nuxt-link to="/pricing"
        :class="[
          { 'home-nav-link-active': $nuxt.$route.path == '/pricing' },
          'home-nav-link',
          'font-weight-bold',
        ]"
      >
        Pricing
      </nuxt-link>
      <nuxt-link to="/register"
        :class="[
          { 'home-nav-link-active': $nuxt.$route.path == '/register' },
          'home-nav-link',
          'font-weight-bold',
        ]"
      >
        Register
      </nuxt-link>
      <nuxt-link to="/login"
        :class="[
          { 'home-nav-link-active': $nuxt.$route.path == '/login' },
          'home-nav-link',
          'font-weight-bold',
        ]"
      >
        Login
      </nuxt-link>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app color="primary">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      title: 'ChatApp',
    }
  },
}
</script>
<style scoped>
.home-nav-link {
  text-decoration: none;
  margin-right: 15px;
}
.home-nav-link:hover {
  color: #f3f3f3;
}
.home-nav-link-active {
  color: #ffffff;
}
</style>
