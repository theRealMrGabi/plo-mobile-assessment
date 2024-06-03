import React from 'react'
import { CheckBox, CheckBoxProps } from '@rneui/themed'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../../utils'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const Checkbox = ({ children, ...rest }: CheckBoxProps) => {
	return (
		<CheckBox
			{...rest}
			textStyle={{
				fontSize: hp(1.5),
				color: 'gray',
				fontWeight: '500'
			}}
			checkedColor={colors['purple-100']}
		/>
	)
}
