<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">Clientes Registrados</v-card-title>
          <v-card-actions>
            <v-btn @click="openCreateDialog" color="primary" class="mb-4">
              <v-icon left>mdi-plus</v-icon>
              Crear Nuevo Cliente
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="clients"
              item-key="id"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Lista de Clientes</v-toolbar-title>
                </v-toolbar>
              </template>
              <template v-slot:item="props">
                <tr>
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.lastname }}</td>
                  <td>{{ props.item.address }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>
                    <v-btn @click="updateClient(props.item)" class="primary" small>
                      <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="deleteClient(props.item.id)" class="error" small>
                      <v-icon dark>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="createDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Crear Nuevo Cliente</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="createForm" v-model="valid">
            <v-text-field
              v-model="newClient.name"
              label="Nombre"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="newClient.lastname"
              label="Apellido"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="newClient.address"
              label="Dirección"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="newClient.email"
              label="Correo Electrónico"
              :rules="[rules.email]"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="createDialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="createClient">Crear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Actualizar Cliente</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="selectedClient.name"
              label="Nombre"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="selectedClient.lastname"
              label="Apellido"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="selectedClient.address"
              label="Dirección"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="selectedClient.email"
              label="Correo Electrónico"
              :rules="[rules.email]"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updateDialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="saveClient">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'ClientsView',
  data() {
    return {
      clients: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'name' },
        { text: 'Apellido', value: 'lastname' },
        { text: 'Dirección', value: 'address' },
        { text: 'Correo Electrónico', value: 'email' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      createDialog: false,
      updateDialog: false,
      newClient: {
        name: '',
        lastname: '',
        address: '',
        email: ''
      },
      selectedClient: {},
      valid: true,
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
        email: value => /.+@.+\..+/.test(value) || 'Debe ser un correo válido.'
      }
    };
  },
  created() {
    this.fetchClients();
  },
  methods: {
    fetchClients() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost/REST_API/clients/api_clients.php', true);

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          console.log(data);
          this.clients = data.clients;
        } else {
          console.error('Error fetching clients:', xhr.statusText);
        }
      };

      xhr.onerror = () => {
        console.error('Error fetching clients:', xhr.statusText);
      };

      xhr.send();
    },
    deleteClient(id) {
      if (confirm('¿Estás seguro que deseas eliminar el cliente?')) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'http://localhost/REST_API/clients/api_clients.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            if (data.message === 'Cliente eliminado exitosamente.') {
              this.clients = this.clients.filter(client => client.id !== id);
            } else {
              console.error('No se pudo eliminar el cliente');
            }
          } else {
            console.error('Error deleting client:', xhr.statusText);
          }
        };

        xhr.onerror = () => {
          console.error('Error deleting client:', xhr.statusText);
        };

        xhr.send(JSON.stringify({ id }));
      }
    },
    openCreateDialog() {
      this.newClient = { name: '', lastname: '', address: '', email: '' }; 
      this.createDialog = true;
    },
    createClient() {
      if (this.$refs.createForm.validate()) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/REST_API/clients/api_clients.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);

            if (data.message === 'Cliente creado exitosamente.') {
              this.clients.push(data.client);
              this.createDialog = false;
              alert('Cliente creado exitosamente');
              this.fetchClients();
            } else {
              console.error('No se pudo crear el cliente');
            }
          } else {
            console.error('Error creating client:', xhr.statusText);
          }
        };

        xhr.onerror = () => {
          console.error('Error creating client:', xhr.statusText);
        };

        xhr.send(JSON.stringify(this.newClient));
      }
    },
    updateClient(client) {
      this.selectedClient = { ...client }; 
      this.updateDialog = true;
    },
    saveClient() {
      if (this.$refs.form.validate()) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost/REST_API/clients/api_clients.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            if (data.message === 'Cliente actualizado exitosamente.') {
              this.clients = this.clients.map(client =>
                client.id === this.selectedClient.id ? this.selectedClient : client
              );
              this.updateDialog = false;
            } else {
              console.error('No se pudo actualizar el cliente');
            }
          } else {
            console.error('Error updating client:', xhr.statusText);
          }
        };

        xhr.onerror = () => {
          console.error('Error updating client:', xhr.statusText);
        };

        xhr.send(JSON.stringify(this.selectedClient));
      }
    }
  }
};
</script>

<style scoped>
</style>
