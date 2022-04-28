<template>
  <div v-if="Object.keys(msgs).length > 0">
    <ul>
      <li class="text-danger" v-for="(message,property, index) in msgs" :key="property">
        {{property}}: {{message}}
      </li>
    </ul>
  </div>
</template>

<script>
/* Component definition sample */

/**Visualiza un listado de errores de validación
   @notes use &lt;erroresValidacion :msgs="array_errores"/&gt;
 */
export default {
  props: [
    'msgs'  //Component attribute (single binding)
  ],
}
</script>
