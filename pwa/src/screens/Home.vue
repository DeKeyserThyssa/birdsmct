<template>
  <route-holder title="Home">
    <div class="mb-6">
      <p>{{ $t('message.hello') }}</p>
      <p>{{ $t('test') }}</p>
    </div>

    <div class="mb-6">
      <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
        Random birds
      </h2>
    </div>

    <div class="mb-6">
      <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
        Top locations
      </h2>
      <div v-if="result">
        <map-view
          :mapCoordinates="{ lng: 50.236, lat: 5.321523 }"
          :polygons="surfaces"
          class="-ml-6 min-h-[30vh] w-[calc(100vw)] lg:ml-[calc(calc(100vw-72rem)/-2)]"
        />
      </div>
    </div>
  </route-holder>
</template>

<script lang="ts">
import { ref, Ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { Polygon } from 'geojson'

import RouteHolder from '../components/holders/RouteHolder.vue'
import MapView from '../components/generic/MapView.vue'
import Location from '../interfaces/interface.location'
import { LOCATIONS } from '../graphql/query.location'
import Area from '../interfaces/interface.location'

export default {
  components: {
    RouteHolder,
    MapView,
  },
  setup() {
    const surfaces: Ref<Polygon[]> = ref([])
    const { result, loading, error } = useQuery(LOCATIONS)
    watch(result, () => {
      surfaces.value = result.value.areas.map((area: Area) => area.surface)
    })
    return {
      result,
      loading,
      error,
      surfaces,
    }
  },
}
</script>
