import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, FormInput, BrandText } from '../components'
import { SingninSchema } from '../validations'
import { SigninPayload } from '../interface'

export const SigninScreen = () => {
	const methods = useForm<SigninPayload>({
		resolver: yupResolver(SingninSchema),
		mode: 'all'
	})

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = methods

	const onSubmit = handleSubmit(data => data)

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

					<View className='mt-8'>
						<Button onPress={() => onSubmit()}>Sign in</Button>
					</View>
				</FormProvider>
			</View>
		</SafeAreaView>
	)
}
