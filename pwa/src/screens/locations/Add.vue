<template>
  <route-holder title="Add Locations">
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
            v-model="areaInput.name"
            id="name"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            type="text"
            name="name"
            />
        </label>
      </div>

      <button
        class="mt-6 flex w-full items-center justify-center rounded-md bg-neutral-700 py-2 px-3 text-white outline-none ring-neutral-300 hover:bg-neutral-900 focus-visible:ring"
        :disabled="loading"
      >
        <span v-if="!loading">Add location</span>
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

    const areaInput = reactive({
      name: 'Beautiful bird',
      area: null,
    })

    const ADD_AREA = gql`
      mutation createArea(
        $createAreaInput: CreateAreaInput!
      ) {
        createArea(createAreaInput: $createAreaInput) {
          id
          name
        }
      }
    `

    const { result, loading, error } = useQuery(INSERT_DATA)

    const { mutate: addArea } = useMutation(ADD_AREA, () => ({
      // Callback function for reactive data & variable name without $...
      variables: {
        createAreaInput: areaInput,
      },
    }))
    const submitForm = async () => {
      const area = await addArea().catch((err) => {
        console.log({ err })
        errorMessage.value = err.message
      })
      console.log(area)
    }

    return {
      areaInput,
      result,
      loading,
      error,
      errorMessage,
      submitForm,
    }
  },
}
</script>
