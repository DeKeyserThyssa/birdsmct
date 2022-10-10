<template>
  <route-holder :title="`Hi, ${user?.displayName}`">
    <button @click="handleLogout">Log out</button>

  </route-holder>
</template>

<script lang="ts">
import RouteHolder from '../components/holders/RouteHolder.vue'
import useAuthentication from '../composables/useAuthentication'
import { useRouter } from 'vue-router'

export default {
  components: {
    RouteHolder,
  },
  
  setup() {
    const { user, logout } = useAuthentication()
    const { replace } = useRouter()

    const handleLogout = () => {
      logout().then(() => {
        return replace('/auth/login')
      })
    }

    const getToken = async () => {
      console.log(await user.value?.getIdToken())
    }

    getToken()

    return {
      user,
      handleLogout,
    }
  },
}
</script>
