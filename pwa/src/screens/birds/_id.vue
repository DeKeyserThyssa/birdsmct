<template>
  <route-holder :title="`${birdName}`">
    <div v-if="loading">
      <p>Loading</p>
    </div>
    <div v-else-if="error">
      <p>Error happened</p>
    </div>
    <div class="grid grid-cols-[1fr_2fr] gap-12" v-else-if="result">
      <img
        class="aspect-square w-full"
        :src="`./${result.bird.name}.webp`"
        :alt="`Drawing of a ${result.bird.name}`"
      />
      <!-- <h2 class="font-theme text-2xl font-bold">{{ result.bird.name }}</h2> -->
      <div class="max-w-lg">
        <p class="mb-3 text-sm">{{ result.bird.category }}</p>
        <p class="text-lg leading-relaxed">{{ result.bird.description }}</p>
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

    const { result, loading, error } = useQuery(BIRD_BY_ID, {
      id: params.id,
    })

    // TODO: check rendering of async name property
    const birdName: Ref<string> = ref(result.value?.bird.name || '')

    watch(result, () => {
      if (result.value) birdName.value = result.value.bird.name
    })

    const getBirdById = () => {}

    params.id

    return {
      result,
      loading,
      error,
      birdName,
    }
  },
}
</script>
