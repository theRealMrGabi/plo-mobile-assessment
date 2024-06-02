import React, { useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'

import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, FormInput, Checkbox, BrandText } from '../components'
import { useAppNavigation } from '../hook'

import { SignupSchema } from '../validations'
import { SignupPayload } from '../interface'

export const SignupScreen = () => {
	const { appNavigation } = useAppNavigation()

	const [termsChecked, setTermsChecked] = useState(false)

	const methods = useForm<SignupPayload>({
		resolver: yupResolver(SignupSchema),
		mode: 'all'
	})

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = methods

	const onSubmit = handleSubmit(data => {
		console.log('🚀 ==> data:', data)
		appNavigation.navigate('MainApp')
	})

	return (
		<SafeAreaView className='bg-white flex-1'>
			<View className='p-4'>
				<BrandText className='text-3xl text-left mb-5' />

				<Text
					className='text-black font-bold pl-2'
					style={{ fontSize: hp(2.5) }}>
					Signup!
				</Text>

				<Text className='text-gray-500 p-2 mb-8' style={{ fontSize: hp(1.8) }}>
					Create a new account
				</Text>

				<FormProvider {...methods}>
					<FormInput
						placeholder='Enter first name'
						label='First name'
						{...register('firstName')}
						errorMessage={errors.firstName?.message}
					/>

					<FormInput
						placeholder='Enter last name'
						label='Last name'
						{...register('lastName')}
						errorMessage={errors.lastName?.message}
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
						<Button onPress={() => onSubmit()}>Create account</Button>
					</View>
				</FormProvider>
			</View>
		</SafeAreaView>
	)
}
