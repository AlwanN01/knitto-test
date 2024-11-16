import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useRouter } from 'expo-router'
import React from 'react'

export const useAuth = () => {
  const [token, SetToken] = React.useState<string | null>(null)
  const router = useRouter()
  // const token = useAppSelector(state => state.authSlice.token)

  useFocusEffect(
    React.useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem('token')
        if (!token) router.push('/login')
        else SetToken(token)
      }
      checkToken()
    }, [])
  )

  return token
}