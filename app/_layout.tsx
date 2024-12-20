import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useColorScheme } from '@/hooks/useColorScheme'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name='index' options={{ headerShown: false, title: 'Home' }} />
            <Stack.Screen name='login' options={{ headerShown: false, title: 'Login' }} />
            <Stack.Screen name='+not-found' />
          </Stack>
          <StatusBar style='auto' />
        </SafeAreaProvider>
      </Provider>
    </ThemeProvider>
  )
}
