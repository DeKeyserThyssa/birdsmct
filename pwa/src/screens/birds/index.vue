<template>
  <route-holder title="Birds">
    <div
      class="grid animate-pulse gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
      v-if="loading"
    >
      <div v-for="i of skeletons" :key="i">
        <div class="aspect-square bg-neutral-200"></div>
        <p class="my-1 h-6 w-12 rounded bg-neutral-200"></p>
        <p class="my-2 h-6 w-12 rounded bg-neutral-100"></p>
      </div>
    </div>
    <div
      class="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
      v-else-if="result"
    >
      <RouterLink :to="`birds/${b.id}`" v-for="b of result.birds" :key="b.id">
        <img
          class="aspect-square w-full"
          :src="`./birds/${b.name}.webp`"
          :alt="`Drawing of a ${b.name}`"
        />
        <h2 class="font-theme text-2xl font-bold">{{ b.name }}</h2>
        <p class="text-sm">{{ b.category }}</p>
      </RouterLink>
    </div>
  </route-holder>
</template>

<script lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { ref, Ref } from 'vue'

import RouteHolder from '../../components/holders/RouteHolder.vue'

export default {
  components: {
    RouteHolder,
  },
  setup() {
    const skeletons: Ref<number> = ref(10)
    const BIRDS = gql`
      query Birds {
        birds {
          id
          name
          category
          url
          description
        }
      }
    `

    const { result, loading, error } = useQuery(BIRDS)

    return {
      result,
      loading,
      error,
      skeletons,
    }
  },
}
</script>
