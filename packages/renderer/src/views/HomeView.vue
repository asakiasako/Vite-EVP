<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import CheckFunctions from '@/components/CheckFunctions.vue'
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <hello-world msg="You did it!" />
      <check-functions></check-functions>
    </div>
  </header>
  <main>
    <TheWelcome />
  </main>
</template>
