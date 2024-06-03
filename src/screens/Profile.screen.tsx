import React from 'react'
import { Text, SafeAreaView, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { format } from 'date-fns'

import { UserCircleIcon } from 'react-native-heroicons/solid'
import { useAuthContext } from '../contexts/auth.context'
import { colors } from '../../utils'
import { Button } from '../components'
import { useAppNavigation } from '../hook'

export const ProfileScreen = () => {
	const { currentUser, userToken } = useAuthContext()
	const { handleSignOut } = useAppNavigation()

	return (
		<SafeAreaView>
			<View className='px-4'>
				<View className='flex gap-4'>
					<UserCircleIcon size={wp(25)} color={colors['purple-300']} />
				</View>

				<View className='mt-5 bg-plo-purple-300 rounded-lg p-4 space-y-4'>
					<View className='flex flex-row gap-2'>
						<Text className='text-lg text-plo-purple-200'>Email:</Text>
						<Text className='text-xl font-semibold capitalize text-plo-purple-200'>
							{currentUser?.email}
						</Text>
					</View>

					<View className='flex flex-row gap-2'>
						<Text className='text-lg text-plo-purple-200'>First name:</Text>
						<Text className='text-xl font-semibold capitalize text-plo-purple-200'>
							{currentUser?.first_name}
						</Text>
					</View>

					<View className='flex flex-row gap-2'>
						<Text className='text-lg text-plo-purple-200'>Last name:</Text>
						<Text className='text-xl font-semibold capitalize text-plo-purple-200'>
							{currentUser?.last_name}
						</Text>
					</View>

					<View className='flex flex-row gap-2'>
						<Text className='text-lg text-plo-purple-200'>Date joined:</Text>
						<Text className='text-xl font-semibold capitalize text-plo-purple-200'>
							{format(new Date(userToken?.createdAt!), 'PPP')}
						</Text>
					</View>
				</View>

				<View
					style={{
						margin: wp(10)
					}}>
					<Button variant='danger' onPress={handleSignOut}>
						Sign out
					</Button>
				</View>
			</View>
		</SafeAreaView>
	)
}
