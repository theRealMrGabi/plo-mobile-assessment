import React from 'react'
import { View, Text } from 'react-native'
import clsx from 'clsx'

import { TaskStatus } from '../interface'

interface Props {
	status: TaskStatus
}

export const StatusPill = ({ status }: Props) => {
	return (
		<View
			className={clsx('rounded-2xl py-3 px-4', {
				'bg-plo-blue-200': status === 'Incomplete',
				'bg-green-200': status === 'Completed'
			})}>
			<Text
				className={clsx('font-semibold', {
					'text-plo-blue-100': status === 'Incomplete',
					'text-green-800': status === 'Completed'
				})}>
				{status}
			</Text>
		</View>
	)
}
