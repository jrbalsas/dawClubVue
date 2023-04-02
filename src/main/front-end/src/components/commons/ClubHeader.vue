<template>
  <header class="p-5 bg-light rounded-3">
    <h1>
      <a href="index_old.html"><img src="/images/logo.png"></a>
      {{ text }}
    </h1>
  </header>
</template>

<script>
//Sample layout component
export default {
  props: [
    'text' //Component attribute (single binding)
  ]
}
</script>