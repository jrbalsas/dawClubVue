<template>
  <h2 v-if="cliente.id>0">Edición de cliente </h2>
  <h2 v-if="cliente.id===0">Alta de cliente </h2>

  <!-- Show server validation errors -->
  <ListaErrores :msgs="errorMsgs"/>

  <form novalidate name='frmClientes' class="well">

    <h3>ID: <span>{{ cliente.id }}</span></h3>

    <label>Nombre: </label><input name='nombre'
                                  v-model="cliente.nombre" required class="form-control"
                                  :class="{'is-invalid': errorMsgs.nombre}"/>
    <p id="errNombre" class="text-danger" v-if='errorMsgs.nombre'>
      El nombre es obligatorio
    </p>

    <label>DNI: </label><input name="Dni"
                               v-model="cliente.dni" class="form-control"
                               :class="{ 'is-invalid': errorMsgs.dni}"/>
    <p id="errDni" class="text-danger" v-if='errorMsgs.dni'>
      El DNI no es de la forma 12345678-A
    </p>
    <div class="form-group form-check mt-2">
      <input type="checkbox" id="ibSocio" class="form-check-input"
             v-model="cliente.socio"/>
      <label class="form-check-label">Socio:</label>
    </div>
    <button class="btn btn-primary"
            @click.prevent="guardarCliente">Guardar
    </button>
    <button class="btn btn-danger"
            v-if='cliente.id>0'
            @click.prevent="$emit('deleteCliente',cliente.id)">Borrar
    </button>
    <a @click.prevent="cliente.id=undefined" class="btn btn-default">Cancelar</a>
  </form>
</template>

<script>
import ListaErrores from "../commons/ListaErrores.vue";

export default {
  props: [
    'cliente' //Component attribute (single binding)
  ],
  inject: ['clientesDAO'],
  emits: [
    'updateCliente',
    'deleteCliente'
  ],
  data() {
    return {
      errorMsgs: {}
    }
  },
  components: {
    ListaErrores
  },
  computed: {
    hayErrores() {
      return Object.keys(this.errorMsgs).length > 0;
    }
  },
  methods: {
    async guardarCliente() {
      if (this.validarCliente()) {
        console.log("actualizando cliente")
        try {
          if (this.cliente.id === 0) {
            //create new client promise
            await this.clientesDAO.crea(this.cliente)
          } else {
            //update client promise
            await this.clientesDAO.guarda(this.cliente)
          }
          this.$emit('updateCliente')
        } catch (err) {
          console.log("Errores de validación en servidor")
          err.forEach(error => {
            this.errorMsgs[error.name] = error.message;
          })
        }
      }
    },
    validarCliente() {
      console.log("Validación en cliente")
      this.errorMsgs = {}; //clear previous errors
      let valido = true;

      if (this.cliente.nombre.length < 3)
        this.errorMsgs.nombre = "La longitud del nombre no es correcta (>=3)";
      if (/^\d{7,8}-?[A-Z]$/i.test(this.cliente.dni) === false)
        this.errorMsgs.dni = "No es un nif válido";

      if (Object.keys(this.errorMsgs).length > 0) {
        console.log("Errores de validación en cliente")
        valido = false;
      }
      return valido;
    }
  },
}
</script>