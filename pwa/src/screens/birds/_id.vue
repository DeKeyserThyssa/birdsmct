<template>
  <route-holder :title="`${birdName}`">
    <div v-if="loading">
      <p>Loading</p>
    </div>
    <div v-else-if="error">
      <p>Error happened</p>
    </div>
    <div v-else-if="result">
      <p class="mb-12 text-sm font-medium tracking-wider">
        {{ result.bird.category }}
      </p>
      <div class="grid grid-cols-[1fr_2fr] items-center gap-12">
        <img
          class="aspect-square w-full"
          :src="`/birds/${result.bird.name}.webp`"
          :alt="`Drawing of a ${result.bird.name}`"
        />

        <div class="max-w-lg">
          <p class="text-lg leading-relaxed">{{ result.bird.description }}</p>
        </div>
      </div>
    </div>
  </route-holder>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { Ref } from 'vue-demi'
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import Bird from '../../interfaces/interface.bird'
import RouteHolder from '../../components/holders/RouteHolder.vue'

export default {
  components: {
    RouteHolder,
  },
  setup() {
    const { params } = useRoute()

    const BIRD_BY_ID = gql`
      query bird($id: String!) {
        bird(id: $id) {
          id
          name
          url
          description
          category
        }
      }
    `

    const { result, loading, error } = useQuery<{ bird: Bird }>(BIRD_BY_ID, {
      id: params.id,
    })

    const birdName: Ref<string> = ref(
      // @ts-ignore
      result && result.bird ? result.bird.name : '...',
    )

    watch(result, (result) => {
      if (result) birdName.value = result.bird.name
    })

    return {
      result,
      loading,
      error,
      birdName,
    }
  },
}
</script>
