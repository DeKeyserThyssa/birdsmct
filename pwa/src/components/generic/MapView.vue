<template>
  <div class="min-h-[50vh]" ref="mapElement"></div>
</template>

<script lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'

import mapboxgl, { LngLatLike, Map, MapMouseEvent, Marker } from 'mapbox-gl'
import { ref, onMounted, Ref, watch } from 'vue'
import { Polygon } from 'geojson'

export default {
  props: {
    mapCoordinates: {
      type: Object as () => LngLatLike,
      required: true,
    },

    markers: {
      type: Array as () => LngLatLike[],
      required: false,
      default: () => [],
    },

    polygons: {
      type: Array as () => Polygon[],
      required: false,
    },
  },
  setup(props, { emit }) {
    const mapElement: Ref<HTMLElement | undefined> = ref()
    const selectedMarker: Ref<Marker | undefined> = ref()
    //@ts-ignore
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

    const renderMarkerIfAny = (map: Map) => {
      if (props.markers && props.markers.length < 1) return

      for (const marker of props.markers!) {
        new mapboxgl.Marker().setLngLat(marker).addTo(map)
      }
    }

    const centerMapOnPolygons = (map: Map) => {
      if (props.polygons && props.polygons.length < 1) return
      let { lng, lat } = { lng: 0, lat: 0 }
      let amount: number = 0
      // TOOD: Location map?
      props.polygons!.map(({ coordinates }) => {
        coordinates.map((coordinate) => {
          coordinate.map(([x, y]) => {
            amount++
            lng += x
            lat += y
          })
        })
      })
      console.log(lng, lat, amount)
      map.flyTo({
        center: [lng / amount, lat / amount],
        zoom: 16,
        speed: 1
      })
    }

    const renderPolygonsIfAny = (map: Map) => {
      if (props.polygons && props.polygons.length < 1) return

      for (const polygon in props.polygons!) {
        map.addSource(`surface-${polygon}`, {
          type: 'geojson',
          data: props.polygons[polygon],
        })
        map.addLayer({
          id: `surface-${polygon}`,
          type: 'fill',
          source: `surface-${polygon}`,
          layout: {},
          paint: {
            'fill-color': '#088',
            'fill-opacity': 0.6,
          },
        })
      }
      // centerMapOnPolygons(map)
    }

    // DOM content loaded
    onMounted(() => {
      const map = new mapboxgl.Map({
        container: mapElement.value!, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: props.mapCoordinates, // starting position [lng, lat]
        zoom: 15, // starting zoom
        projection: { name: 'globe' }, // display the map as a 3D globe
      })

      map.on('style.load', () => {
        map.setFog({}) // Set the default atmosphere style
      })

      renderMarkerIfAny(map)
      renderPolygonsIfAny(map)

      map.on('click', (e: MapMouseEvent) => {
        if (selectedMarker.value) selectedMarker.value.remove()
        selectedMarker.value = new Marker().setLngLat(e.lngLat).addTo(map)

        emit('coordinateSelection', e.lngLat)
      })
      watch(props, () => {
        renderMarkerIfAny(map)
        renderPolygonsIfAny(map)
      })
    })

    return { mapElement }
  },
}
</script>
