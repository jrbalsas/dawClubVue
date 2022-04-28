/**Sample VUE JS component using options API */
export default {
    props: [
        'text' //Component attribute (single binding)
    ],
    mounted() {
        console.log("Cargando componente JS: ClubFooter.js")
    },
    template: `
        <footer class="card text-right well bg-light">
          <div class="card-body">
            <p class="card-text">
            <span v-if="!text">
                Made with <span class="text-danger">&#9829;</span> in DAW
            </span>
              {{ text }}
            </p>
          </div>
        </footer>
    `
}