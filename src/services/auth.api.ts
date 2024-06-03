import { _axios } from './axios'
import {
	SigninPayload,
	SignupPayload,
	SigninResponse,
	SignupResponse
} from '../interface'

export const SigninApi = async (payload: SigninPayload) => {
	try {
		const response = await _axios.post({
			url: 'login',
			payload
		})
		return response as SigninResponse
	} catch (error) {
		throw error
	}
}

export const SignupApi = async (payload: SignupPayload) => {
	try {
		const response = await _axios.post({
			url: 'register',
			payload
		})
		return response as SignupResponse
	} catch (error) {
		throw error
	}
}
