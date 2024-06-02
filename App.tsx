/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { queryClient } from './utils'
import { AppNavigation } from './src/navigation'

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaProvider>
					<AppNavigation />
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	)
}

export default App
