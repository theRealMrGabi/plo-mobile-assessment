import React from 'react'
import { Text } from 'react-native'
import { cn } from '../../utils'

interface Props {
	className?: string
}
export const BrandText = ({ className }: Props) => {
	return (
		<Text
			className={cn(
				'text-plo-purple-300 font-bold text-5xl text-center',
				className
			)}>
			Task Management
		</Text>
	)
}
