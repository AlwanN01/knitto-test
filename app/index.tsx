import { useAuth } from '@/hooks/useAuth'
import { useGetImagesQuery } from '@/redux/services/imagesApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect, useFocusEffect, useRouter } from 'expo-router'
import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
export default function HomePage() {
  const token = useAuth()

  const { data, error, isLoading } = useGetImagesQuery({ token, page: 1, perPage: 10 })
  const router = useRouter()
  console.log('app\\index.tsx:')
  console.log(data)
  if (isLoading) return <ActivityIndicator />
  if (error) {
    const errorMessage = (error as QueryError).data || 'Unknown error'
    return <Text>Error: {errorMessage}</Text>
  }

  return (
    <View>
      <Text>HomePage</Text>
    </View>
  )
}
