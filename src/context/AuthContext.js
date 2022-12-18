/* eslint-disable */
// ** React Imports
import {createContext, useEffect, useState} from 'react'

// ** Next Import
import {useRouter} from 'next/router'

// ** Axios
import generateClient from '../utils/axiosClient'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({children}) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized)
  const axios = generateClient()

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      setIsInitialized(true)
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({role: 'admin', ...response.data.userData})
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const handleLogin = (params, errorCallback) => {
    console.log({params})
    axios
      .post(authConfig.loginEndpoint, {
        identifier: params.email,
        password: params.password
      })
      .then(async res => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.jwt)
      })
      .then(() => {
        axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
            }
          })
          .then(async response => {
            const returnUrl = router.query.returnUrl
            setUser({role: 'admin', ...response.data})
            await window.localStorage.setItem('userData', JSON.stringify({role: 'admin', ...response.data}))
            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
            router.replace(redirectURL)
          })
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({email: params.email, password: params.password})
        }
      })
      .catch(err => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthProvider}
