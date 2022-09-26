<template>
  <ul
    class="grid w-full grid-cols-4 items-center text-center text-xs font-medium sm:w-auto sm:space-x-3 sm:text-left sm:text-sm"
  >
    <li>
      <router-link active-class="opacity-40" class="px-3 py-6 inline-block" to="/"
        ><Home class="mx-auto mb-2 h-5 sm:hidden" />Home</router-link
      >
    </li>
    <li>
      <router-link active-class="opacity-40" class="px-3 py-6 inline-block" to="/birds"
        ><Feather class="mx-auto mb-2 h-5 sm:hidden" />Birds</router-link
      >
    </li>
    <li>
      <router-link
        active-class="opacity-40"
        class="px-3 py-6 inline-block"
        to="/observations"
        ><Clipboard
          class="mx-auto mb-2 h-5 sm:hidden"
        />Observations</router-link
      >
    </li>
    <li>
      <router-link active-class="opacity-40" class="px-3 py-6 inline-block" to="/log"
        ><Scroll class="mx-auto mb-2 h-5 sm:hidden" />Log</router-link
      >
    </li>
    <li class="hidden pl-6 sm:block">
      <router-link class="px-3 py-6" to="/account" v-if="user">{{
        user.displayName
      }}</router-link>
      <router-link class="px-3 py-6" v-else to="/auth/login">Login</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Home, Feather, Scroll, Clipboard } from 'lucide-vue-next'

export default {
  components: {
    Home,
    Feather,
    Scroll,
    Clipboard,
  },
}
</script>
