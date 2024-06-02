import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { IAppStack } from '../interface'
import { SigninScreen, SignupScreen, SplashScreen } from '../screens'
import { HomeTabNavigation } from './home.tab.navigation'

const AppStack = createNativeStackNavigator<IAppStack>()

export const AppNavigation = () => {
	return (
		<NavigationContainer>
			<AppStack.Navigator
				initialRouteName='Splash'
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
