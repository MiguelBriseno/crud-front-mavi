<template>
  <v-app>
    <v-navigation-drawer
      app
      v-if="isAuthenticated"
    >
      <v-list dense>
        <v-list-item to="/" exact>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/clients" exact>
          <v-list-item-title>Clients</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isAuthenticated" to="/login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isAuthenticated" @click="handleLogout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      this.$router.push({ name: 'LoginView' });
      window.location.reload(); 
    }
  }
};
</script>

<style>
</style>
