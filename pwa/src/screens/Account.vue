<template>
  <h1>Hi, {{ user?.displayName }}</h1>
</template>

<script setup lang="ts">
import useAuthentication from '../composables/useAuthentication'

const { user } = useAuthentication()
</script>
