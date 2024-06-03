import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import axios, { AxiosError, AxiosHeaders } from 'axios'
import Toast from 'react-native-toast-message'

import {
	_storageKeys,
	retrieveObjectFromStorage,
	clearLocalStorage
} from '../../utils'

const apiService = () => {
	//In a production app, put the baseURL in an environmental variable
	const baseURL = 'https://tmapi.vercel.app'

	const axiosService = axios.create({
		baseURL: `${baseURL}/`,
		withCredentials: false,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Origin': baseURL
		}
	})

	axiosService.interceptors.request.use(
		async (config: InternalAxiosRequestConfig) => {
			let token

			await retrieveObjectFromStorage(_storageKeys.userToken)
				.then(response => {
					token = response.token
				})
				.catch(err => console.error(err))

			if (!token) {
				return config
			}

			;(config.headers as AxiosHeaders).set('x-access-token', token)

			return config
		}
	)

	axiosService.interceptors.response.use(
		(response: AxiosResponse) => response,
		async (error: AxiosError) => {
			if (error?.response === undefined) {
				Toast.show({
					type: 'error',
					text1: 'Internet connection',
					text2: 'Unable to connect to internet'
				})
			} else {
				const errorData = error?.response?.data as Record<
					string,
					string | object
				>

				const errorMessage = (errorData?.message ||
					errorData.error ||
					'Something went wrong') as string

				if (errorMessage) {
					Toast.show({
						type: 'error',
						text1: errorMessage
					})
				}

				if (
					['Invalid session token !! Please login again'].includes(errorMessage)
				) {
					//signout user here
					await clearLocalStorage()
						.then(res => console.log(res))
						.catch(err => console.error(err))
				}

				return Promise.reject(errorData)
			}
		}
	)

	interface IPostProps {
		url: string
		payload?: object
	}

	return {
		get: async (url: string) => {
			try {
				const data = axiosService.get(url)
				const resolvedData = await Promise.resolve(data)
				return resolvedData?.data
			} catch (error) {
				return Promise.reject(error)
			}
		},

		post: async ({ url, payload }: IPostProps) => {
			try {
				const data = axiosService.post(url, payload)
				const resolvedData = await Promise.resolve(data)
				return resolvedData?.data
			} catch (error) {
				return Promise.reject(error)
			}
		},

		patch: async ({ url, payload }: IPostProps) => {
			try {
				const data = axiosService.patch(url, payload)
				const resolvedData = await Promise.resolve(data)
				return resolvedData?.data
			} catch (error) {
				return Promise.reject(error)
			}
		},

		delete: async ({ url, payload }: IPostProps) => {
			try {
				const data = axiosService.delete(url, { data: payload })
				const resolvedData = await Promise.resolve(data)
				return resolvedData?.data
			} catch (error) {
				return Promise.reject(error)
			}
		},

		put: async ({ url, payload }: IPostProps) => {
			try {
				const data = axiosService.put(url, payload)
				const resolvedData = await Promise.resolve(data)
				return resolvedData?.data
			} catch (error) {
				return Promise.reject(error)
			}
		}
	}
}

export const _axios = apiService()
