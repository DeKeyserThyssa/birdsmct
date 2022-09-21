<template>
  <div>
    <AppHeader />
    <router-view></router-view>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import AppFooter from '../generic/AppFooter.vue'
import AppHeader from '../generic/AppHeader.vue'

export default {
  components: {
    AppFooter,
    AppHeader,
  },
}
</script>
