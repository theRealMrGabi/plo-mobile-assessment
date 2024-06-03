import React, { useState } from 'react'
import { View, Text, SafeAreaView, Modal, Alert, Linking } from 'react-native'

import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

import { Button, FormInput, Checkbox, BrandText } from '../components'
import { useAppNavigation } from '../hook'

import { SignupSchema } from '../validations'
import { SignupPayload } from '../interface'
import { SignupApi } from '../services'

export const SignupScreen = () => {
	const { appNavigation } = useAppNavigation()

	const [modalVisible, setModalVisible] = useState(false)
	const [termsChecked, setTermsChecked] = useState(false)
	const [activationUrl, setActivationUrl] = useState<string | null>(null)

	const methods = useForm<SignupPayload>({
		resolver: yupResolver(SignupSchema),
		mode: 'all'
	})

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = methods

	const { isPending, mutate } = useMutation({
		mutationFn: SignupApi,
		onSuccess: async response => {
			Toast.show({
				type: 'success',
				text1: 'Signup successful'
			})

			setActivationUrl(response.email_preview_link)
			setModalVisible(true)
		}
	})

	const onSubmit = handleSubmit(data => {
		if (!termsChecked) {
			return Toast.show({
				type: 'info',
				text1: 'Accept terms & conditions'
			})
		}

		mutate(data)
	})

	return (
		<SafeAreaView className='bg-white flex-1'>
			<View className='p-4'>
				<BrandText className='text-3xl text-left mb-5' />

				<Text
					className='text-black font-bold pl-2'
					style={{ fontSize: hp(2.5) }}>
					Sign Up!
				</Text>

				<Text className='text-gray-500 p-2 mb-8' style={{ fontSize: hp(1.8) }}>
					Create a new account
				</Text>

				<FormProvider {...methods}>
					<FormInput
						placeholder='Enter first name'
						label='First name'
						{...register('first_name')}
						errorMessage={errors.first_name?.message}
					/>

					<FormInput
						placeholder='Enter last name'
						label='Last name'
						{...register('last_name')}
						errorMessage={errors.last_name?.message}
					/>

					<FormInput
						placeholder='Enter email address'
						label='Email'
						keyboardType='email-address'
						{...register('email')}
						errorMessage={errors.email?.message}
					/>

					<FormInput
						placeholder='Enter password'
						label='Password'
						secureTextEntry
						{...register('password')}
						errorMessage={errors.password?.message}
					/>

					<View>
						<Checkbox
							title='By creating an account, you agree to our terms and conditions'
							checked={termsChecked}
							onPress={() => setTermsChecked(prevState => !prevState)}
						/>
					</View>

					<View className='mt-8'>
						<Button onPress={onSubmit} disabled={isPending}>
							Create account
						</Button>
					</View>
				</FormProvider>

				<Text className='text-center font-medium'>
					Already have an account?{' '}
					<Text
						className='font-bold text-plo-purple-100'
						onPress={() => appNavigation.navigate('Signin')}>
						Signin
					</Text>
				</Text>

				<Modal
					animationType='slide'
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.')
						setModalVisible(!modalVisible)
					}}>
					<View className='flex-1 justify-center items-center bg-white'>
						<Text className='text-plo-purple-100 font-bold text-xl'>
							Signup Successful
						</Text>

						<Text className='text-lg py-3'>
							Click link below to verify account
						</Text>

						{activationUrl && (
							<Text
								className='py-6'
								onPress={() => Linking.openURL(activationUrl)}>
								{activationUrl}
							</Text>
						)}

						<Button
							variant='secondary'
							className='w-1/2'
							onPress={() => {
								setModalVisible(false)
								appNavigation.navigate('Signin')
							}}>
							Close Modal
						</Button>
					</View>
				</Modal>
			</View>
		</SafeAreaView>
	)
}
