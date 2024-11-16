import { useGetImagesQuery } from '@/redux/services/imagesApi'
import { View, Text, ActivityIndicator } from 'react-native'
export default function HomePage() {
  const { data, error, isLoading } = useGetImagesQuery({ page: 1, perPage: 10 })
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
