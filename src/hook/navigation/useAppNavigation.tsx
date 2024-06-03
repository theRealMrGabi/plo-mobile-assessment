import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/core'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { IAppStack, HomeTab, IHomeStack } from '../../interface'
import { _storageKeys } from '../../../utils'

export const useAppNavigation = () => {
	const appNavigation = useNavigation<NativeStackNavigationProp<IAppStack>>()

	const handleSignOut = async () => {
		try {
			await AsyncStorage.removeItem(_storageKeys.user)
			await AsyncStorage.removeItem(_storageKeys.userToken)
		} catch (error) {
			throw error
		} finally {
			appNavigation.navigate('Signin')
		}
	}

	return { appNavigation, handleSignOut }
}

export const useHomeTabNavigation = () => {
	const homeTabNavigation = useNavigation<BottomTabNavigationProp<HomeTab>>()

	return { homeTabNavigation }
}

export const useHomeStackNavigation = () => {
	const navigation = useNavigation<NativeStackNavigationProp<IHomeStack>>()

	const route = useRoute<RouteProp<IHomeStack>>()

	return { navigation, route }
}
