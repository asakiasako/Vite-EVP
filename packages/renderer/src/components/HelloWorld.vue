<script setup>

defineProps({
  msg: {
    type: String,
    required: true
  }
})

/**
 * Open URL in external browser
 * @param {string} url
 */
function openUrl (url) {
  window.electronAPI.shell.openExternal(url)
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a @click="openUrl('https://vitejs.dev/')">Vite</a> +
      <a @click="openUrl('https://www.electronjs.org/')">Electron</a> +
      <a @click="openUrl('https://vuejs.org/')">Vue 3</a> +
      <a @click="openUrl('https://www.python.org/')">Python</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
