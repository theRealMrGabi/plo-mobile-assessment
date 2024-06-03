import { _axios } from './axios'
import { CreateTaskPayload, Task } from '../interface'

export const TaskQueryKeys = {
	getTasks: 'getTasks'
}

export const GetTasksApi = async () => {
	try {
		const response = await _axios.get('task')
		return response as Task[]
	} catch (error) {
		throw error
	}
}

export const CreateTaskApi = async (payload: CreateTaskPayload) => {
	try {
		const response = await _axios.post({
			url: 'task/create',
			payload
		})
		return response as Task[]
	} catch (error) {
		throw error
	}
}

export const UpdateTaskApi = async ({
	payload,
	taskId
}: {
	payload: CreateTaskPayload
	taskId: string
}) => {
	try {
		const response = await _axios.patch({
			url: `task/${taskId}`,
			payload
		})
		return response as Task[]
	} catch (error) {
		throw error
	}
}

export const DeleteTaskApi = async (taskId: string) => {
	try {
		const response = await _axios.delete({
			url: `task/${taskId}`
		})
		return response as Task[]
	} catch (error) {
		throw error
	}
}
