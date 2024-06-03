import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { IHomeStack } from '../interface'
import { HomeScreen, UpdateTaskScreen } from '../screens'

const Stack = createNativeStackNavigator<IHomeStack>()

export const HomeStackNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName='Home'
			screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='TaskDetail' component={UpdateTaskScreen} />
		</Stack.Navigator>
	)
}
