import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // Path to vuetify export
import store from './store'; // Import the store
import router from './router'; // Import the router

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router, // Register the router
  render: h => h(App),
}).$mount('#app');
