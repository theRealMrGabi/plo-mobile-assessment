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
import Toast from 'react-native-toast-message'
// import { NativeModules } from 'react-native'

import { queryClient } from './utils'
import { AppNavigation } from './src/navigation'
import { Providers } from './src/contexts/index.context'

// if (__DEV__) {
// 	NativeModules.DevSettings.setIsDebuggingRemotely(true)
// }

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaProvider>
					<Providers>
						<AppNavigation />
					</Providers>
					<Toast />
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	)
}

export default App
