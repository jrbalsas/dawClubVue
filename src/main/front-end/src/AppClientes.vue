<template>
  <div>
    <ClubHeader text="Club de tenis"/>
    <main>
      <div class="row">
        <nav class="col-md-2">
          <h2>Opciones</h2>
          <ul class="nav nav-pills flex-column">
            <li class="nav-item"><a class="nav-link" href="#">Inicio</a></li>
            <li class="nav-item"><a class="nav-link " href="#"
                                    @click.prevent="altaCliente()">Nuevo Cliente</a></li>
            <li v-if="cliente.id>0" class="nav-item">
                                    <a class="nav-link text-danger" href="#"
                                       @click.prevent="borraCliente(cliente.id)">Borrar</a></li>
          </ul>
        </nav>
        <section class="col-md-10">
          <ListaErrores :msgs="errorMsgs"/>
          <ClientesList v-if="cliente.id === undefined"
                        :datos="clientes"
                        @select-cliente="visualizaCliente"/>
          <ClientesForm v-if="cliente.id !== undefined"
                        :cliente="cliente"
                        @update-cliente="clienteActualizado"
                        @delete-cliente="borraCliente"/>
        </section>
      </div>
    </main>
    <ClubFooter/>
  </div>
</template>

<script>
//import ClubFooter from "./components/commons/ClubFooter"    //Sample Vue JS component (requires esm-bundler, see main.js)
import ClubFooter from "./components/commons/ClubFooter.vue"  //Vue SFC component version
import ClubHeader from "./components/commons/ClubHeader.vue";
import ClientesList from "./components/clientes/ClienteList.vue";
import ClientesForm from "./components/clientes/ClienteForm.vue";
import ListaErrores from "./components/commons/ListaErrores.vue"
import {ClientesDAOfetch, ClientesDAOList} from "./services/clientes.services.js";

//Init DAO (select one DAO implementation)
//const clientesDAO = new ClientesDAOList(); //For local testing (no REST API)
const clientesDAO = new ClientesDAOfetch('http://localhost:8080/club/api/clientes'); //For REST API access

export default {

  components: {
    ClubHeader,
    ClubFooter,
    ClientesList,
    ClientesForm,
    ListaErrores,
  },
  provide: {
    clientesDAO
  },
  mounted() {
    this.cargaClientes()
  },
  data() {
    return {
      clientes: [ ],
      cliente: {},
      errorMsgs: {}
    }
  },
  methods: {
    cargaClientes() {
      //AJAX request: Promise version
      //TODO catch api access errors
      clientesDAO.buscaTodos()
          .then(data => {
            this.clientes = data
            this.cliente = { }
            this.errorMsgs={ }
          })
    },
    async borraCliente(clienteId) {
      if (clienteId > 0) {
        //AJAX request: async/await version
        await clientesDAO.borra(clienteId);
        this.cargaClientes();
      }
    },
    async visualizaCliente(clienteId) {
      console.log(`visualizando cliente ${clienteId}`)
      this.cliente = await clientesDAO.busca(clienteId)
    },
    altaCliente() {
      this.errorMsgs={ }
      this.cliente = {id: 0, nombre: '', socio: false}
    },
    async clienteActualizado() {
      console.log("actualizado cliente en servidor")
      this.cargaClientes()
    },
  }
}
</script>