import * as Yup from 'yup'

export const SingninSchema = Yup.object({
	email: Yup.string()
		.email('Valid email address is required')
		.required('Valid email address is required'),
	password: Yup.string().required('Password is required')
})

export const SignupSchema = SingninSchema.shape({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required')
})
