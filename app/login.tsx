//buatkan form login untuk user

import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, Alert } from 'react-native'

import React from 'react'
import { useMergeState } from '@/hooks/useMergeState'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useLoginMutation } from '@/redux/services/loginApi'
import type { AxiosError } from 'axios'

export default function LoginPage() {
  const [state, setState] = useMergeState({ username: '', password: '' })
  const router = useRouter()
  const [login, { isLoading }] = useLoginMutation()
  React.useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token')
      if (token) router.replace('/')
    }
    checkToken()
  }, [])

  const handleLogin = async () => {
    try {
      const response = await login({ username: state.username, password: state.password })
      console.log('🚀 ~ response:', response)
      if (response.data) {
        await AsyncStorage.setItem('token', response.data.token)
        router.replace('/')
      } else {
        const status = (response.error as QueryError).status
        Alert.alert(status === 401 ? 'Invalid Username or Password' : 'Error', (response.error as AxiosError).message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Login Page</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          placeholderTextColor='gray'
          autoCapitalize='none'
          value={state.username}
          onChangeText={value => setState({ username: value })}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          placeholderTextColor='gray'
          value={state.password}
          autoCapitalize='none'
          secureTextEntry
          onChangeText={value => setState({ password: value })}
        />
        <Pressable onPress={handleLogin}>
          <Text style={styles.LoginButton}>Sign In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },

  formContainer: {
    backgroundColor: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    gap: 10,
    width: '100%',
    maxWidth: 1024
    // marginHorizontal: 'auto',
    // pointerEvents: 'auto'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18
  },
  LoginButton: {
    backgroundColor: '#0a7ea4',
    color: 'white',
    paddingVertical: 12,
    borderRadius: 8,
    textAlign: 'center',
    marginVertical: 10
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto'
  },
  todoText: {
    flex: 1,
    fontSize: 18
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray'
  }
})
