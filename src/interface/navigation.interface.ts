import type { RouteProp } from '@react-navigation/native'
import { Task } from './'

export type IAppStack = {
	Splash: undefined
	Signin: undefined
	Signup: undefined
	MainApp: undefined
}

export type HomeTab = {
	HomeStack: undefined
	CreateTask: undefined
	Profile: undefined
}

export type IHomeStack = {
	Home: undefined
	TaskDetail: {
		task: Task
	}
}

export type HomeStackRouteProps<RouteName extends keyof IHomeStack> = RouteProp<
	IHomeStack,
	RouteName
>
