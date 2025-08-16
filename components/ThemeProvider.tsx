import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native'
import { ReactNode } from 'react'
import { useColorScheme } from 'react-native'

export function ThemeProvider({ children }: { children: ReactNode }) {
    const theme = useColorScheme() === 'dark' ? DarkTheme : DefaultTheme
    return <NavigationThemeProvider value={theme}>{children}</NavigationThemeProvider>
}
