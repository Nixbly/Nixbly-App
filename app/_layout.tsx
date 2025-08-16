import { ThemeProvider } from '@/components/ThemeProvider'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = { initialRouteName: '(tabs)' }

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [ready, setReady] = useState(false)
  const scheme = useColorScheme()

  useEffect(() => {
    async function load() {
      await Asset.loadAsync([
        require('../assets/images/nixbly-logo.png'),
        require('../assets/images/nixbly-logo.png')
      ])
      await Font.loadAsync({
        Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
        ...FontAwesome.font
      })
      setReady(true)
    }
    load()
  }, [])

  const onLayout = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync()
  }, [ready])

  if (!ready) return null

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayout} accessibilityRole='none'>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
        </Stack>
      </SafeAreaView>
    </ThemeProvider>
  )
}
