<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
      class="min-vh-100"
    >
      <v-col
        cols="12"
        md="8"
        lg="6"
        class="d-flex justify-center align-center"
      >
        <v-card
          class="pa-5"
          elevation="2"
          outlined
          tile
        >
          <v-card-title class="text-center">
            <h1 class="headline mb-2">Bienvenido a la Prueba Técnica</h1>
          </v-card-title>
          <v-card-subtitle class="text-center">
            <p class="subtitle-1 mb-4">
              Estimado entrevistador, esperamos que esta prueba técnica sea de tu agrado. Si necesitas alguna información adicional, no dudes en contactar con nosotros.
            </p>
            <v-btn
              v-if="!buttonClicked"
              color="primary"
              class="ma-2"
              @click="handleClick"
            >
              Da click aquí para ver una animación divertida
            </v-btn>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="showModal"
      max-width="300"
      persistent
      hide-overlay
    >
      <v-card>
        <v-card-title class="text-center">¡Disfruta de la animación!</v-card-title>
        <v-card-subtitle class="text-center">
          <v-img
            src="https://media.giphy.com/media/3o6Zt2zvO7NviPqS0U/giphy.gif"
            contain
          ></v-img>
        </v-card-subtitle>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      showModal: false,
      buttonClicked: false
    };
  },
  methods: {
    handleClick() {
      if (!this.buttonClicked) {
        this.showModal = true;
        this.buttonClicked = true;

        setTimeout(() => {
          this.showModal = false;
        }, 2000);

        this.buttonClicked = false;
      }
    }
  }
};
</script>

<style scoped>
/* Puedes ajustar el estilo aquí si es necesario */
</style>
