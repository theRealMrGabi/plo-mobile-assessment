export interface User {
	_id: string
	first_name: string
	last_name: string
	email: string
	password: string
	verified: boolean
	email_verification_token: string
	tasks: []
	__v: number
}

export interface UserToken {
	createdAt: string
	token: string
	_id: string
	__v: number
}
