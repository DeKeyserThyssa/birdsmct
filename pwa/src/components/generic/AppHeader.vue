
<template>
  <header class="px-6 py-6">
    <nav class="mx-auto flex max-w-6xl items-center justify-between">
      <router-link class="" to="/">
        <Logo />
      </router-link>

      <AppNavigation class="hidden sm:flex" />
    </nav>
  </header>
</template>

<script lang="ts">
import AppNavigation from './AppNavigation.vue'
import Logo from './Logo.vue'
export default {
  components: {
    AppNavigation,
    Logo,
  },
  setup() {},
}
</script>