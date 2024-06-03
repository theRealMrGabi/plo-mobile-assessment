import React from 'react'
import {
	Text,
	View,
	SafeAreaView,
	FlatList,
	TouchableOpacity
} from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'

import { StatusPill } from '../components'
import { GetTasksApi, TaskQueryKeys } from '../services'
import { useHomeStackNavigation } from '../hook'

export const HomeScreen = () => {
	const { navigation } = useHomeStackNavigation()
	const { data, isPending } = useQuery({
		queryKey: [TaskQueryKeys.getTasks],
		queryFn: GetTasksApi
	})

	return (
		<SafeAreaView className='flex-1 bg-plo-purple-200'>
			<View className='p-4'>
				<Text className='text-xl font-medium'>All Tasks</Text>

				{isPending ? (
					<View className='my-5'>
						{/* eslint-disable-next-line no-unused-vars */}
						{[...Array.from({ length: 5 })].map((_item, i) => (
							<View key={i} className='animate-pulse my-3'>
								<View className='bg-slate-300 h-20 w-full rounded-lg p-4 space-y-4'>
									<View className='bg-slate-500 rounded-lg w-3/5 h-5' />
									<View className='flex flex-row justify-between items-center'>
										<View className='w-2/5 bg-slate-500 h-5 rounded-lg' />
										<View className='w-2/5 bg-slate-500 h-5 pb-2 rounded-lg' />
									</View>
								</View>
							</View>
						))}
					</View>
				) : (
					<FlatList
						data={data || []}
						keyExtractor={item => item._id}
						className='my-5'
						//@ts-expect-error
						ItemSeparatorComponent={<ItemSeparatorComponent />}
						renderItem={({ item }) => (
							<TouchableOpacity
								className='border border-plo-purple-300 p-3 rounded-lg space-y-4 bg-white'
								key={item._id}
								activeOpacity={0.7}
								onPress={() =>
									navigation.navigate('TaskDetail', {
										task: item
									})
								}>
								<Text className='text-lg'>{item.task}</Text>
								<View className='flex flex-row justify-between items-center'>
									<Text className='capitalize'>
										{formatDistanceToNow(new Date(item.date), {
											addSuffix: true
										})}
									</Text>

									<StatusPill status={item.status} />
								</View>
							</TouchableOpacity>
						)}
					/>
				)}
			</View>
		</SafeAreaView>
	)
}

const ItemSeparatorComponent = () => {
	return <View className='my-2' />
}
