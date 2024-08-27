<template>
  <v-container>
    <v-row align="center" justify="center" class="login-container">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-subtitle class="text-h6">Please enter your credentials</v-card-subtitle>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="login">
              <v-text-field
                v-model="nickname"
                label="User"
                type="text"
                required
                outlined
                :rules="[v => !!v || 'User is required']"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                outlined
                :rules="[v => !!v || 'Password is required']"
              ></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                class="mt-4"
                :loading="loading"
                :disabled="!valid"
              >
                Login
              </v-btn>
              <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      nickname: '',
      password: '',
      loading: false,
      error: '',
      valid: false
    };
  },
  methods: {
    login() {
      this.$refs.form.validate();
      if (this.valid) {
        this.loading = true;
        this.error = '';

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/REST_API/users/login.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onload = () => {
          this.loading = false;
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            if (response.message === 'Login exitoso') {
              localStorage.setItem('user', JSON.stringify(response.user));
              localStorage.setItem('token', response.token); 
              this.$router.push({ name: 'HomePage' }); 
            } else {
              this.error = response.message;
            }
          } else {
            this.error = 'An error occurred. Please try again.';
          }
        };

        xhr.onerror = () => {
          this.loading = false;
          this.error = 'An error occurred. Please try again.';
        };

        xhr.send(JSON.stringify({
          nickname: this.nickname,
          password: this.password
        }));
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
}
</style>
