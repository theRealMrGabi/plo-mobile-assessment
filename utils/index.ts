import { StyleSheet } from 'react-native'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const colors = Object.freeze({
	white: '#ffffff',
	black: '#000000',
	'purple-100': '#613BE7',
	'purple-200': '#F0EDFD',
	'purple-300': '#aa96da'
})

export const _storageKeys = Object.freeze({
	user: 'user',
	userToken: 'userToken'
})

export const saveObjectToStorage = async ({
	key,
	data
}: {
	key: string
	data: Object
}) => {
	try {
		await AsyncStorage.setItem(key, JSON.stringify(data))
	} catch (error) {
		throw error
	}
}

export const retrieveObjectFromStorage = async (key: string) => {
	try {
		const value = await AsyncStorage.getItem(key)

		return value !== null ? JSON.parse(value) : null
	} catch (error) {
		throw error
	}
}

export const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderColor: 'gray',
		borderBottomWidth: 1,
		color: 'black',
		paddingRight: 30
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderColor: 'purple',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30
	}
})

export { queryClient } from './query-client'
