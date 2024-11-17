import { getToken } from '@/services/authService'
import { useFocusEffect, useRouter } from 'expo-router'
import React from 'react'

export const useAuth = () => {
  const [token, SetToken] = React.useState<string | null>(null)
  const router = useRouter()
  // const token = useAppSelector(state => state.authSlice.token)

  useFocusEffect(
    React.useCallback(() => {
      const checkToken = async () => {
        const token = await getToken()
        if (!token) router.replace('/login')
        else SetToken(token)
      }
      checkToken()
    }, [])
  )

  return token
}
