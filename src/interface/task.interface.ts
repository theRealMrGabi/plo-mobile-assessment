import { InferType } from 'yup'
import { CreateTaskSchema } from '../validations'

export type CreateTaskPayload = InferType<typeof CreateTaskSchema>

export interface Task {
	date: string
	task: string
	status: TaskStatus
	_id: string
}

export const TaskStatusOptions = ['Incomplete', 'Completed'] as const

export type TaskStatus = (typeof TaskStatusOptions)[number]
