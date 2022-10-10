<template>
  <div ref="mapContainer"></div>
</template>

<script lang="ts">
//https://docs.mapbox.com/mapbox-gl-js/guides/install/
//https://leafletjs.com/
//login maken
//todo: set developer API in .env

//props
//todo: set coordinates of map
//todo: set marker on map
//todo: set polygon on map

//emit (iets terugsturen naar bovenliggende parent)
//todo: return coordinates of tap/click on map

//api
//todo: replace location with coordinates

import mapboxgl from 'mapbox-gl'
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const mapContainer = ref()
    onMounted(() => {
      //@ts-ignore
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
      const map = new mapboxgl.Map({
        container: mapContainer.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-69.25657, 45.52524], // starting position [lng, lat]
        zoom: 9, // starting zoom
        projection: 'globe', // display the map as a 3D globe
      })

      map.on('style.load', () => {
        map.setFog({}) // Set the default atmosphere style
      })

      //get cooridinates when click
      map.on('click', (e) => {
        console.log(e.lngLat)
      })

      map.on('load', () => {
        // Add a data source containing GeoJSON data.
        map.addSource('maine', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              // These coordinates outline Maine.
              coordinates: [
                [
                  [-67.13734, 45.13745],
                  [-66.96466, 44.8097],
                  [-68.03252, 44.3252],
                  [-69.06, 43.98],
                  [-70.11617, 43.68405],
                  [-70.64573, 43.09008],
                  [-70.75102, 43.08003],
                  [-70.79761, 43.21973],
                  [-70.98176, 43.36789],
                  [-70.94416, 43.46633],
                  [-71.08482, 45.30524],
                  [-70.66002, 45.46022],
                  [-70.30495, 45.91479],
                  [-70.00014, 46.69317],
                  [-69.23708, 47.44777],
                  [-68.90478, 47.18479],
                  [-68.2343, 47.35462],
                  [-67.79035, 47.06624],
                  [-67.79141, 45.70258],
                  [-67.13734, 45.13745],
                ],
              ],
            },
          },
        })

        // Add a new layer to visualize the polygon.
        map.addLayer({
          id: 'maine',
          type: 'fill',
          source: 'maine', // reference the data source
          layout: {},
          paint: {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5,
          },
        })

        new mapboxgl.Marker({
          color: '#ff0000',
          draggeble: true,
        })
          .setLngLat([-69.25657, 45.52524])
          .addTo(map)
      })
    })

    return { mapContainer }
  },
}
</script>
