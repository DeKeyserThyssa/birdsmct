import {
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  updateProfile,
  signInWithEmailAndPassword,
} from '@firebase/auth'
import { ref, Ref } from 'vue'
import useFirebase from './useFirebase'

const user: Ref<User | null> = ref(null)

export default () => {
  const { auth } = useFirebase()

  const setUser = (u: User | null) => (user.value = u)

  console.log(auth)

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<Ref<User | null>> => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((u: UserCredential) => {
          updateProfile(u.user, {
            displayName: name,
          })
            .then(() => {
              setUser(u.user)
              resolve(user)
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // TODO: login
  const login = async (
    email: string,
    password: string,
  ): Promise<Ref<User | null>> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((u: UserCredential) => {
          console.log(u)

          setUser(u.user)

          resolve(user)
        })

        .catch((error) => {
          reject(error)
        })
    })
  }

  const logout = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          setUser(null)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const restoreUser = (): Promise<Ref<User | null>> => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((u: User | null) => {
        if (u) {
          setUser(u)
          resolve(user)
        } else {
          resolve(ref(null))
        }
      })
    })
  }

  // TODO: restore auth

  // TODO: forgot password

  // TODO: track user

  return {
    user,

    register,
    login,
    logout,
    restoreUser,
    setUser,
  }
}
