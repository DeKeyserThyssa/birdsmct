<template>
  <ul
    class="grid w-full grid-cols-4 items-center text-center text-xs font-medium sm:w-auto sm:space-x-3 sm:text-left sm:text-sm"
  >
    <li>
      <Home class="mx-auto mb-2 h-5 sm:hidden" />
      <router-link class="px-3 py-6" to="/">Home</router-link>
    </li>

    <li>
      <Feather class="mx-auto mb-2 h-5 sm:hidden" />
      <router-link class="px-3 py-6" to="/birds">Birds</router-link>
    </li>

    <li>
      <Clipboard class="mx-auto mb-2 h-5 sm:hidden" />
      <router-link class="px-3 py-6" to="/observations"
        >Observations</router-link
      >
    </li>

    <li>
      <Scroll class="mx-auto mb-2 h-5 sm:hidden" />
      <router-link class="px-3 py-6" to="/log">Log</router-link>
    </li>

    <li class="hidden pl-6 sm:block">
      <router-link class="px-3 py-6" to="/account" v-if="user">
        {{ user.displayName }}
      </router-link>
      <router-link class="px-3 py-6" to="/auth/login" v-else>
        Login
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Home, Feather, Scroll, Clipboard } from 'lucide-vue-next'
import useAuthentication from '../../composables/useAuthentication'
export default defineComponent({
  components: { Home, Feather, Scroll, Clipboard },
  setup() {
    const { user } = useAuthentication()
    return {
      user,
    }
  },
})
</script>