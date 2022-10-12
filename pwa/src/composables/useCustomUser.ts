import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable'
import { User } from 'firebase/auth'
import { Ref, ref, watch } from 'vue'
import { GET_USER_BY_UID } from '../graphql/query.user'
import useGraphQL from './useGraphQL'

const user: Ref<User | null> = ref(null)

export default () => {
  const setCustomUser = (u: User) => user.value
  const { apolloClient } = useGraphQL()

  provideApolloClient(apolloClient)

  const { result, load, document } = useLazyQuery(GET_USER_BY_UID)

  const loadCustomUser = (uid: string) => {
    load(document.value, {
      uid,
    })
  }

  watch(result, ({ findByUId }) => {
    if (findByUId) setCustomUser(findByUId)
  })

  return {
    customUser: user,

    loadCustomUser,
  }
}
