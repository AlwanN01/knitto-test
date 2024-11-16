import { useAuth } from '@/hooks/useAuth'
import { useGetImagesQuery, type GetImagesResponse } from '@/redux/services/imagesApi'
import { removeToken } from '@/services/authService'
import { useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Pressable,
  FlatList,
  Image,
  TextInput,
  type NativeScrollEvent,
  type NativeSyntheticEvent
} from 'react-native'
import { useDebounceState } from '@/hooks/useDebounce'
import { isCloseToBottom } from '@/lib/utils'
import { useMergeState } from '@/hooks/useMergeState'
import { StatusBar } from 'expo-status-bar'

export default function HomePage() {
  const token = useAuth()
  const router = useRouter()

  const [state, setState] = useMergeState({
    text: '',
    searchTerm: '',
    page: 1,
    perPage: 10,
    images: [] as GetImagesResponse['hits']
  })
  const { images, text, searchTerm, page, perPage } = state

  // const [text, setText] = React.useState<string>()
  // const [searchTerm, setSearchTerm] = React.useState<string>()
  // const [searchTerm, setSearchTerm] = useDebounceState<string>()
  // const [images, setImages] = React.useState<GetImagesResponse['hits']>([])

  const { data, error, isLoading, isFetching } = useGetImagesQuery(
    { searchTerm, token, page, perPage },
    { skip: !token }
  )

  React.useEffect(() => {
    if (data) {
      const newHits = data.hits.filter(newImage => !images.some(existingImage => existingImage.id === newImage.id))
      setState(prevImages => ({ images: [...prevImages.images, ...newHits] }))
    }
  }, [data])

  const handleSearch = () => {
    // setImages([])
    // setSearchTerm(text)
    setState({ searchTerm: text, images: [] })
  }
  const handleScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(nativeEvent) && !isFetching) {
      setState(prevState => ({ page: prevState.page + 1 }))
    }
  }
  const handleLogout = async () => {
    await removeToken()
    router.replace('/login')
  }
  if (error) {
    const errorMessage = (error as QueryError).data || 'Unknown error'
    return <Text>Error: {errorMessage}</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          <FontAwesome name='home' size={24} color='black' />
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Search Images'
          placeholderTextColor='gray'
          value={text}
          onChangeText={text => setState({ text })}
          onSubmitEditing={handleSearch}
        />
        <Pressable onPress={handleLogout}>
          <Text style={styles.LogoutButton}>
            <Feather name='log-out' size={24} />
          </Text>
        </Pressable>
      </View>
      {(!token || isLoading || isFetching) && (
        <ActivityIndicator style={{ position: 'absolute', top: '50%', left: '50%' }} size='large' />
      )}
      <View>
        <FlatList
          data={images}
          renderItem={({ item }) => <ImageCard image={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ gap: 10, margin: 10 }}
          onScroll={handleScroll}
          // scrollEventThrottle={30}
        />
      </View>
      {/* <StatusBar style='auto' /> */}
    </SafeAreaView>
  )
}

const ImageCard = ({ image }: { image: GetImagesResponse['hits'][0] }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image.webformatURL }} style={styles.images} />
      <View style={{ flex: 1, gap: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{image.user}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 0.3, fontSize: 12 }}>Tags</Text>
          <Text style={{ flex: 1, fontSize: 12, color: '#888' }}>{image.tags}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 0.3, fontSize: 12 }}>Views</Text>
          <Text style={{ flex: 1, fontSize: 12, color: '#888' }}>{image.views}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10
  },

  images: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto',
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    minWidth: 0
    // fontFamily: 'Inter_500Medium',
  },
  searchButton: {
    borderRadius: 5,
    padding: 10
  },
  LogoutButton: {
    // backgroundColor: '#d32f2f',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // borderRadius: 8,
    marginHorizontal: 10,
    textAlign: 'center'
  }
})
