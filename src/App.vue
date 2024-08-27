<template>
  <v-app>
    <!-- Barra de navegación solo visible si hay información del usuario en el localStorage -->
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
      // Verifica si hay información del usuario en el localStorage
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    handleLogout() {
      // Limpia el localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      // Actualiza la vista actual para reflejar el cambio
      this.$router.push({ name: 'LoginView' });
      // Eliminamos la recarga de la ventana
      window.location.reload(); // No es necesario, la navegación debería ser suficiente
    }
  }
};
</script>

<style>
/* Agrega tus estilos aquí */
</style>
