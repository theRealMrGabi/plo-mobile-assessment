import * as Yup from 'yup'

export const SigninSchema = Yup.object({
	email: Yup.string()
		.email('Valid email address is required')
		.required('Valid email address is required'),
	password: Yup.string().required('Password is required')
})

export const SignupSchema = SigninSchema.shape({
	first_name: Yup.string().required('First name is required'),
	last_name: Yup.string().required('Last name is required')
})
