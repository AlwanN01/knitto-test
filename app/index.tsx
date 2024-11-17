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
  TouchableOpacity,
  type NativeScrollEvent,
  type NativeSyntheticEvent
} from 'react-native'
import { isCloseToBottom } from '@/lib/utils'
import { useMergeState } from '@/hooks/useMergeState'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initState = {
  textSearch: '',
  searchTerm: '',
  page: 1,
  perPage: 10,
  images: [] as GetImagesResponse['hits']
}

export default function HomePage() {
  const token = useAuth()
  const router = useRouter()

  const [{ images, textSearch, searchTerm, page, perPage }, setState] = useMergeState(initState)

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
    setState({ searchTerm: textSearch, images: [] })
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
          value={textSearch}
          onChangeText={text => setState({ textSearch: text })}
          onSubmitEditing={handleSearch}
        />
        <Pressable onPress={handleLogout}>
          <Text style={styles.LogoutButton}>
            <Feather name='log-out' size={24} />
          </Text>
        </Pressable>
      </View>
      {(!token || isLoading || isFetching) && (
        <ActivityIndicator style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 10 }} size='large' />
      )}
      <FlatList
        data={images}
        renderItem={({ item }) => <ImageCard image={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ gap: 10, margin: 10, paddingBottom: 30 }}
        onScroll={handleScroll}
        scrollEventThrottle={30}
      />
    </SafeAreaView>
  )
}
type Hits = GetImagesResponse['hits'][0]

const ImageCard = ({ image }: { image: Hits }) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false)

  const toggleBookmark = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarks')
      let parsedBookmarks = bookmarks ? JSON.parse(bookmarks) : []

      if (isBookmarked) {
        parsedBookmarks = parsedBookmarks.filter((item: Hits) => item.id !== image.id)
        setIsBookmarked(false)
      } else {
        parsedBookmarks.push(image)
        setIsBookmarked(true)
      }

      await AsyncStorage.setItem('bookmarks', JSON.stringify(parsedBookmarks))
    } catch (error) {
      console.error('Error toggling bookmark:', error)
    }
  }
  React.useEffect(() => {
    const checkBookmark = async () => {
      try {
        const bookmarks = await AsyncStorage.getItem('bookmarks')
        const parsedBookmarks = bookmarks ? JSON.parse(bookmarks) : []
        const exists = parsedBookmarks.find((item: Hits) => item.id === image.id)
        if (exists) {
          setIsBookmarked(true)
        }
      } catch (error) {
        console.error('Error checking bookmark:', error)
      }
    }
    checkBookmark()
  }, [])

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image.webformatURL }} style={styles.images} />
      <View style={styles.infoContainer}>
        <Text style={styles.cardTitle}>{image.user}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.label}>Tags</Text>
          <Text style={styles.value}>{image.tags}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.label}>Views</Text>
          <Text style={styles.value}>{image.views}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={toggleBookmark} style={{ padding: 10 }}>
        <FontAwesome
          name={isBookmarked ? 'bookmark' : 'bookmark-o'}
          size={24}
          color={isBookmarked ? '#FFD700' : '#000'}
        />
      </TouchableOpacity>
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
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  infoContainer: {
    flex: 1,
    padding: 5
  },
  images: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  label: {
    flex: 0.3,
    fontSize: 12
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: '#888'
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    minWidth: 0
  },
  searchButton: {
    borderRadius: 5,
    padding: 10
  },
  LogoutButton: {
    marginHorizontal: 10,
    textAlign: 'center'
  }
})
