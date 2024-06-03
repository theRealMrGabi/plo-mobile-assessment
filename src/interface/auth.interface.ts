import { InferType } from 'yup'
import { SignupSchema, SigninSchema } from '../validations'
import { User, UserToken } from './'

export type SignupPayload = InferType<typeof SignupSchema>
export type SigninPayload = InferType<typeof SigninSchema>

export interface SignupResponse {
	user: User
	email_preview_link: string
}

export interface SigninResponse {
	user: User
	userToken: UserToken
}
