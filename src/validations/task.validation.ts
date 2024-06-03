import * as Yup from 'yup'
import { TaskStatus } from '../interface'

export const CreateTaskSchema = Yup.object({
	task: Yup.string().required('Task description is required'),
	status: Yup.mixed<TaskStatus>()
		.oneOf(['Completed', 'Incomplete'])
		.required('Task status is required') as Yup.Schema<TaskStatus>,
	date: Yup.string().required('Task creation date is required')
})
