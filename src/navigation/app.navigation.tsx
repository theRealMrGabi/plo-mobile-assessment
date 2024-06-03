import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { IAppStack } from '../interface'
import { SigninScreen, SignupScreen, SplashScreen } from '../screens'
import { HomeTabNavigation } from './home.tab.navigation'
import { useAuthContext } from '../contexts/auth.context'

const AppStack = createNativeStackNavigator<IAppStack>()

export const AppNavigation = () => {
	const { currentUser, isUserLoading } = useAuthContext()

	if (isUserLoading) {
		return (
			<View className='flex-1'>
				<View className='flex justify-center items-center my-auto'>
					<ActivityIndicator size='large' color='#613BE7' />
				</View>
			</View>
		)
	}

	return (
		<NavigationContainer>
			<AppStack.Navigator
				initialRouteName={currentUser ? 'MainApp' : 'Splash'}
				screenOptions={{
					headerShown: false
				}}>
				<AppStack.Screen name='Splash' component={SplashScreen} />
				<AppStack.Screen name='Signup' component={SignupScreen} />
				<AppStack.Screen name='Signin' component={SigninScreen} />
				<AppStack.Screen name='MainApp' component={HomeTabNavigation} />
			</AppStack.Navigator>
		</NavigationContainer>
	)
}
