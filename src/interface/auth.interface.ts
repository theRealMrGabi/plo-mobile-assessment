import { InferType } from 'yup'
import { SignupSchema, SingninSchema } from '../validations'

export type SignupPayload = InferType<typeof SignupSchema>
export type SigninPayload = InferType<typeof SingninSchema>
