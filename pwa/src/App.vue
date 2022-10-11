<template>
  <router-view class="min-h-screen bg-neutral-50 dark:bg-neutral-700"></router-view>
</template>

<script lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import useFirebase from './composables/useFirebase'
import useGraphQL from './composables/useGraphQL'

export default {
  setup() {
    const { app } = useFirebase()
    const { apolloClient } = useGraphQL()

    provide(DefaultApolloClient, apolloClient)

    return {}
  },
}
</script>
