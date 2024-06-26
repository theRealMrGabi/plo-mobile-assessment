import React from 'react'
import { Platform, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { HomeIcon, UserIcon, PlusIcon } from 'react-native-heroicons/outline'
import {
	HomeIcon as HomeIconSolid,
	UserIcon as UserIconSolid,
	PlusIcon as PlusIconSolid
} from 'react-native-heroicons/solid'
import clsx from 'clsx'

import { HomeTab } from '../interface'
import { colors } from '../../utils'
import { ProfileScreen, CreateTaskScreen } from '../screens'
import { HomeStackNavigation } from './home.stack.navigation'

interface Props {
	activeKey: keyof HomeTab
}

const iconProps = {
	color: colors['purple-200'],
	size: wp(5.5)
}

const Tab = createBottomTabNavigator<HomeTab>()
const isAndroid = Platform.OS === 'android'

export const HomeTabNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='HomeStack'
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) =>
					MenuIcons({
						route: route.name,
						focused
					}),
				tabBarShowLabel: false,
				headerShown: false,
				tabBarStyle: {
					position: 'absolute',
					bottom: hp(4),
					backgroundColor: colors['purple-100'],
					marginLeft: wp(5),
					marginRight: wp(5),
					padding: hp(1),
					borderRadius: wp(10),
					height: hp(7),
					paddingTop: 'auto',
					paddingBottom: isAndroid ? hp(1) : 'auto'
				}
			})}>
			<Tab.Screen name='HomeStack' component={HomeStackNavigation} />
			<Tab.Screen name='CreateTask' component={CreateTaskScreen} />
			<Tab.Screen name='Profile' component={ProfileScreen} />
		</Tab.Navigator>
	)
}

const MenuIcons = ({
	route,
	focused
}: {
	route: keyof HomeTab
	focused: boolean
}) => {
	const TabIcon = ({ activeKey }: Props) => {
		const activeIcon = {
			HomeStack: focused ? (
				<HomeIconSolid {...iconProps} />
			) : (
				<HomeIcon {...iconProps} />
			),
			CreateTask: focused ? (
				<PlusIconSolid {...iconProps} />
			) : (
				<PlusIcon {...iconProps} />
			),
			Profile: focused ? (
				<UserIconSolid {...iconProps} />
			) : (
				<UserIcon {...iconProps} />
			)
		}

		return activeIcon[activeKey]
	}

	return (
		<View
			className={clsx({
				'bg-plo-purple-300 p-2 rounded-full': focused
			})}>
			<TabIcon activeKey={route} />
		</View>
	)
}
