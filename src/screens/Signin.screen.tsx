import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

import { Button, FormInput, BrandText } from '../components'
import { SigninSchema } from '../validations'
import { SigninPayload } from '../interface'
import { useAppNavigation } from '../hook'
import { saveObjectToStorage, _storageKeys } from '../../utils'
import { SigninApi } from '../services'

export const SigninScreen = () => {
	const { appNavigation } = useAppNavigation()

	const methods = useForm<SigninPayload>({
		resolver: yupResolver(SigninSchema),
		mode: 'all'
	})

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = methods

	const { isPending, mutate } = useMutation({
		mutationFn: SigninApi,
		onSuccess: async response => {
			Toast.show({
				type: 'success',
				text1: 'Login successful'
			})

			await saveObjectToStorage({
				key: _storageKeys.user,
				data: response.user
			})

			await saveObjectToStorage({
				key: _storageKeys.userToken,
				data: response.userToken
			})

			appNavigation.navigate('MainApp')
		}
	})

	const onSubmit = handleSubmit(data => mutate(data))

	return (
		<SafeAreaView className='bg-white flex-1'>
			<View className='p-4'>
				<BrandText className='text-3xl text-left mb-5' />

				<Text
					className='text-black font-bold pl-2'
					style={{ fontSize: hp(2.5) }}>
					Sign In!
				</Text>

				<Text className='text-gray-500 p-2 mb-8' style={{ fontSize: hp(1.8) }}>
					Create a new account
				</Text>

				<FormProvider {...methods}>
					<FormInput
						placeholder='Enter email address'
						label='Email'
						keyboardType='email-address'
						{...register('email')}
						errorMessage={errors.email?.message}
						defaultValue='abc@xyz.com'
					/>

					<FormInput
						placeholder='Enter password'
						label='Password'
						secureTextEntry
						{...register('password')}
						errorMessage={errors.password?.message}
						defaultValue='password'
					/>

					<View className='mt-8'>
						<Button onPress={onSubmit} disabled={isPending}>
							Sign in
						</Button>
					</View>
				</FormProvider>

				<Text className='text-center font-medium'>
					Don't have an account?{' '}
					<Text
						className='font-bold text-plo-purple-100'
						onPress={() => appNavigation.navigate('Signup')}>
						Signup
					</Text>
				</Text>
			</View>
		</SafeAreaView>
	)
}
