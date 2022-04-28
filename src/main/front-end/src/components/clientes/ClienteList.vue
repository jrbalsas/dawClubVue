<template>
  <h2>Listado de cliente </h2>

  <table class="table table-striped table-hover">
    <thead>
    <tr title="Seleccionar encabezado para cambiar ordenación">
      <th v-on:click="orderBy('id')" scope="col">ID <span v-if="order==='id'">&darr;</span></th>
      <th @click="orderBy('nombre')" scope="col">Nombre<span v-if="order==='nombre'">&darr;</span></th>
      <th @click="order='dni'" scope="col">DNI<span v-if="order==='dni'">&darr;</span></th>
      <th @click="order='socio'" scope="col">Socio<span v-if="order==='socio'">&darr;</span></th>
    </tr>
    </thead>
    <tbody>
    <tr class="c-pointer" v-for="c in clientesOrdenados" :key='c.id'
        @click="$emit('selectCliente',c.id)">
      <th scope="row">{{ c.id }}</th>
      <td>{{ c.nombre }}</td>
      <td>{{ c.dni }}</td>
      <td>{{ c.socio }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
/**Visualiza un resumen de los datos de un cliente
 @notes use &lt;ClienteList :datos='arrayClientes'/&gt;"
 */
export default {
  props: [
    'datos', //Component attribute (single binding)
  ],
  emits: ['selectCliente'],
  data() {
    return {
      order: 'id'
    }
  },
  computed: {
    clientesOrdenados() {
      console.log("ordenando por " + this.order)
      //return sorted copy
      return this.datos.slice().sort((c1, c2) => {
        let result = 0;
        if (c1[this.order] > c2[this.order]) result = 1;
        if (c1[this.order] < c2[this.order]) result = -1;
        return result;
      });
    }
  },
  methods: {
    orderBy(newOrder) {
      this.order = newOrder;
    }
  },
}
</script>