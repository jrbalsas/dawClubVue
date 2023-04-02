<template>
  <footer class="card text-right bg-light">
    <div class="card-body">
      <p class="card-text text-end">
            <span v-if="!text">
                Made with <span class="text-danger">&#9829;</span> in DAW
            </span>
        {{ text }}
      </p>
    </div>
  </footer>
</template>

<script>
//Sample layout component with default text
export default {
  props: [
    'text' //Component attribute (single binding)
  ],
  mounted() {
    console.log("Cargando componente SFC: ClubFooter.vue")
  },
}
</script>