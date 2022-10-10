<template>
  <route-holder title="Home">
    <div class="mb-6">
      <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
        Random birds
      </h2>
    </div>

    <div class="mb-6">
      <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
        Top locations
      </h2>
      <ul>
        <li>
          <RouterLink to="/locations/">Locations</RouterLink>
        </li>
      </ul>
    </div>
  </route-holder>
</template>

<script lang="ts">
import RouteHolder from '../components/holders/RouteHolder.vue'
export default {
  components: {
    RouteHolder,
  },
}
</script>
