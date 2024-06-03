import React from 'react'
import { Text, SafeAreaView, View, Pressable } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import RNPickerSelect from 'react-native-picker-select'

import { colors, pickerSelectStyles } from '../../utils'
import { CreateTaskApi, TaskQueryKeys } from '../services'
import { CreateTaskSchema } from '../validations'

import { CreateTaskPayload, TaskStatusOptions } from '../interface'
import { useHomeTabNavigation } from '../hook'
import { Button, FormInput } from '../components'

export const CreateTaskScreen = () => {
	const queryClient = useQueryClient()
	const { homeTabNavigation } = useHomeTabNavigation()

	const methods = useForm<CreateTaskPayload>({
		resolver: yupResolver(CreateTaskSchema),
		mode: 'all',
		defaultValues: {
			date: new Date().toISOString()
		}
	})

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors }
	} = methods

	const { isPending, mutate } = useMutation({
		mutationFn: CreateTaskApi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [TaskQueryKeys.getTasks]
			})

			Toast.show({
				type: 'success',
				text1: 'Task created'
			})

			homeTabNavigation.navigate('HomeStack')
		}
	})

	const onSubmit = handleSubmit(data => mutate(data))

	return (
		<SafeAreaView className='flex-1 bg-plo-purple-200'>
			<View className='p-4'>
				<Pressable
					disabled={isPending}
					className='flex flex-row items-center gap-4'
					onPress={() => homeTabNavigation.goBack()}>
					<ChevronLeftIcon color={colors['purple-100']} size={wp(6)} />
					<Text className='text-xl text-plo-black-100 font-bold'>
						Create new task
					</Text>
				</Pressable>

				<View className='bg-white p-4 rounded-lg mt-5'>
					<FormProvider {...methods}>
						<FormInput
							placeholder='Enter task description or title'
							label='Task description'
							{...register('task')}
							errorMessage={errors.task?.message}
						/>

						<View className='mx-3'>
							<Text
								style={{
									fontSize: hp(1.7),
									color: 'black',
									fontWeight: 700
								}}>
								Select Task status
							</Text>

							<RNPickerSelect
								onValueChange={value => setValue('status', value)}
								items={TaskStatusOptions.map(item => ({
									label: item,
									value: item
								}))}
								placeholder={{ label: 'Select status', color: '#112022' }}
								style={{
									...pickerSelectStyles
								}}
							/>

							{errors.status?.message && (
								<Text className='text-red-600 text-xs pt-2'>
									{errors.status?.message}
								</Text>
							)}
						</View>

						<View className='mt-8'>
							<Button
								variant='secondary'
								onPress={onSubmit}
								disabled={isPending}>
								Create Task
							</Button>
						</View>
					</FormProvider>
				</View>
			</View>
		</SafeAreaView>
	)
}
