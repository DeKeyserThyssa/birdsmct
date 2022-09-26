<template>
  <router-view class="bg-neutral-50 min-h-screen"></router-view>
</template>

<script lang="ts">
import useFirebase from './composables/useFirebase'

export default {
  setup() {
    const {app} = useFirebase()
    
    return {}
  },
}
</script>
