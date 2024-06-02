import React from 'react'
import { View, ImageBackground } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import { Button, BrandText } from '../components'
import { useAppNavigation } from '../hook'

export const SplashScreen = () => {
	const { appNavigation } = useAppNavigation()

	return (
		<View className='bg-white flex-1 relative'>
			<ImageBackground
				source={require('../../assets/images/splash.jpg')}
				className='h-full w-full'
			/>

			<View
				className='absolute space-y-4 w-[90%]'
				style={{
					bottom: hp(55),
					left: wp(5)
				}}>
				<BrandText />
			</View>

			<View
				className='absolute space-y-4 w-[90%]'
				style={{
					bottom: hp(10),
					left: wp(5)
				}}>
				<Button
					variant='primary'
					onPress={() => appNavigation.navigate('Signin')}>
					Sign In
				</Button>
				<Button
					variant='secondary'
					onPress={() => appNavigation.navigate('Signup')}>
					Sign up
				</Button>
			</View>
		</View>
	)
}
