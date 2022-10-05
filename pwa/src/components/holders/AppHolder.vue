<template>
  <div class="grid-row-[auto_1fr_auto] grid h-screen min-h-screen sm:h-auto">
    <AppHeader />
    <router-view class="overflow-y-auto"></router-view>

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
