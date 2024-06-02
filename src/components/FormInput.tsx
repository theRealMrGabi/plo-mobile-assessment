import React, { forwardRef, useState } from 'react'
import { TextInput } from 'react-native'
import { Input as NativeInput, InputProps, Icon } from '@rneui/themed'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Controller, useFormContext } from 'react-hook-form'

interface Props extends InputProps {
	name: string
}

export const FormInput = forwardRef<TextInput, Props>(
	({ name, ...rest }, ref) => {
		const { control } = useFormContext()

		const [passwordVisible, setPasswordVisible] = useState(false)
		const passwordIcon = passwordVisible ? 'eye' : 'eye-slash'

		return (
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value } }) => (
					<NativeInput
						ref={ref}
						{...rest}
						onChangeText={onChange}
						value={value}
						secureTextEntry={rest.secureTextEntry && !passwordVisible}
						labelStyle={{
							fontSize: hp(1.75),
							color: 'black'
						}}
						containerStyle={{
							marginTop: hp(0.75),
							marginBottom: hp(0.75)
						}}
						inputStyle={{
							fontSize: hp(2),
							color: 'black'
						}}
						rightIcon={
							rest.secureTextEntry ? (
								<Icon
									type='font-awesome'
									name={passwordIcon}
									onPress={() => setPasswordVisible(prevState => !prevState)}
								/>
							) : (
								rest.rightIcon
							)
						}
					/>
				)}
			/>
		)
	}
)
