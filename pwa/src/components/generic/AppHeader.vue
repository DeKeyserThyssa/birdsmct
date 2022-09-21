<template>
  <header>
    <div class="mr-6 pt-6">
      <div class="flex items-center justify-between">
        <Logo class="h-15 ml-3" />
        <div class="flex gap-8">
          <RouterLink to="/" class="font-theme text-3xl">Home</RouterLink>
          <RouterLink to="/birds" class="font-theme text-3xl">Birds</RouterLink>
          <RouterLink to="/log" class="font-theme text-3xl">Log</RouterLink>
          <RouterLink to="/observations" class="font-theme text-3xl"
            >Observations</RouterLink
          >
          <RouterLink to="/locations" class="font-theme text-3xl"
            >Locations</RouterLink
          >
          <RouterLink to="/account" class="font-theme ml-4 text-3xl">{{
            user?.displayName
          }}</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import useAuthentication from '../../composables/useAuthentication'
import Logo from '../generic/Logo.vue'

export default {
  setup() {
    const { user } = useAuthentication()
    return {
      user,
    }
  },
  components: { Logo },
}
</script>
