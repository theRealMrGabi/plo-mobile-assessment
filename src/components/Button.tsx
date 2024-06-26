import type { PropsWithChildren } from 'react'
import React from 'react'
import { Text, Pressable, PressableProps } from 'react-native'
import clsx from 'clsx'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface Props extends PressableProps {
	variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
}

export const Button = ({
	variant = 'primary',
	children,
	...rest
}: PropsWithChildren<Props>) => {
	return (
		<Pressable
			{...rest}
			className={clsx(
				'w-full rounded-full my-2 disabled:bg-opacity-40',
				{
					'bg-plo-purple-100': variant === 'primary',
					'bg-plo-purple-200 ': variant === 'secondary',
					'bg-red-500': variant === 'danger',
					'border border-white': variant === 'tertiary'
				},
				rest.className
			)}
			style={{
				paddingTop: hp(2),
				paddingBottom: hp(2),
				opacity: rest.disabled ? 0.5 : 1
			}}>
			<Text
				className={clsx('font-bold capitalize text-center', {
					'text-white': variant !== 'secondary',
					'text-plo-purple-100': variant === 'secondary'
				})}
				style={{
					fontSize: hp(2)
				}}>
				{children}
			</Text>
		</Pressable>
	)
}
