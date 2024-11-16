import AsyncStorage from '@react-native-async-storage/async-storage'

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    return token
  } catch (error) {
    console.error('Error fetching token:', error)
    return null
  }
}

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token)
  } catch (error) {
    console.error('Error saving token:', error)
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token')
  } catch (error) {
    console.error('Error removing token:', error)
  }
}
