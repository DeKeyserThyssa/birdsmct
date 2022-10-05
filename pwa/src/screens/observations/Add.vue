<template>
  <route-holder title="Add Observation">
    <form class="mt-6 w-full max-w-3xl" @submit.prevent="submitForm">
      <div
        v-if="errorMessage"
        class="mb-3 flex items-center justify-between rounded-md bg-red-100 px-3 py-1"
      >
        <p class="text-sm text-red-600">{{ errorMessage }}</p>
        <button
          @click="errorMessage = ''"
          class="rounded-full p-3 ring-red-600 hover:bg-red-200 focus:outline-none focus:ring-2"
        >
          <X class="h-4 w-4 text-red-600" />
        </button>
      </div>
      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="name"
        >
          <span class="mb-2 block">Name</span>
          <input
            v-model="observationInput.name"
            id="name"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            type="text"
            name="name"
          />
        </label>
      </div>
      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="birdId"
        >
          <span class="mb-2 block">Bird specie</span>
          <select
            :disabled="loading"
            v-if="result"
            v-model="observationInput.birdId"
            name="birdId"
            id="birdId"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
          >
            <option value="Pick a bird species" selected disabled>
              Pick a bird species
            </option>
            <option v-for="b of result.birds" :key="b.id" :value="b">
              {{ b.name }}
            </option>
          </select>
        </label>
      </div>

      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="areaId"
        >
          <span class="mb-2 block">Location</span>
          <select
            :disabled="loading"
            v-if="result"
            v-model="observationInput.areaId"
            name="areaId"
            id="areaId"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
          >
            <option value="Pick a location" selected disabled>
              Pick a location
            </option>
            <option v-for="a of result.areas" :key="a.id" :value="a.id">
              {{ a.name }}
            </option>
          </select>
        </label>
      </div>
      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="description"
        >
          <span class="mb-2 block">Description</span>
          <textarea
            v-model="observationInput.description"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            name="description"
            id="description"
            cols="30"
          >
          </textarea>
        </label>
      </div>

      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="weather"
        >
          <span class="mb-2 block">Weather</span>
          <input
            v-model="observationInput.eather"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            type="text"
            name="weather"
            id="weather"
          />
        </label>
      </div>
      <button
        class="mt-6 flex w-full items-center justify-center rounded-md bg-neutral-700 py-2 px-3 text-white outline-none ring-neutral-300 hover:bg-neutral-900 focus-visible:ring"
        :disabled="loading"
      >
        <span v-if="!loading">Add observation</span>
        <div v-else>
          <Loader2 class="animate-spin" />
        </div>
      </button>
    </form>
  </route-holder>
</template>
<script lang="ts">
import { gql } from 'graphql-tag'
import { useRouter } from 'vue-router'
import { reactive, Ref, ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { Loader2, X } from 'lucide-vue-next'

import RouteHolder from '../../components/holders/RouteHolder.vue'
import useAuthentication from '../../composables/useAuthentication'

export default {
  components: {
    RouteHolder,
    X,
    Loader2,
  },
  setup() {
    const { user } = useAuthentication()
    const { replace } = useRouter()

    const errorMessage: Ref<string> = ref('')

    // TODO: make form
    // Link input values (v-model)
    // TODO: validation...

    const INSERT_DATA = gql`
      query insertData {
        birds {
          id
          name
        }

        areas {
          id
          name
        }
      }
    `

    const observationInput = reactive({
      name: 'Beautiful bird',
      description:
        'A beautiful common buzzard (buteo buteo) flying over Kortrijk.',
      weather: 'Overcast, clouded',
      birdId: 'Buizerd',
      areaId: 'Magdalenapark',
      userId: user.value.uid,
      active: true,
    })

    const ADD_OBSERVATION = gql`
      mutation createObservation(
        $createObservationInput: CreateObservationInput!
      ) {
        createObservation(createObservationInput: $createObservationInput) {
          id
          name
        }
      }
    `

    const { result, loading, error } = useQuery(INSERT_DATA)

    const { mutate: addObservation } = useMutation(ADD_OBSERVATION, () => ({
      // Callback function for reactive data & variable name without $...
      variables: {
        createObservationInput: observationInput,
      },
    }))
    const submitForm = async () => {
      const observation = await addObservation().catch((err) => {
        console.log({ err })
        errorMessage.value = err.message
      })
      console.log(observation)
    }

    return {
      observationInput,
      result,
      loading,
      error,
      errorMessage,
      submitForm,
    }
  },
}
</script>
