import React, { useEffect } from 'react'
import {
	Text,
	View,
	SafeAreaView,
	FlatList,
	TouchableOpacity
} from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { TrashIcon, QueueListIcon } from 'react-native-heroicons/solid'
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

import { Button, StatusPill } from '../components'
import { GetTasksApi, TaskQueryKeys, DeleteTaskApi } from '../services'
import {
	useAppNavigation,
	useHomeStackNavigation,
	useHomeTabNavigation
} from '../hook'
import { colors } from '../../utils'
import { useAuthContext } from '../contexts/auth.context'

export const HomeScreen = () => {
	const queryClient = useQueryClient()
	const { navigation } = useHomeStackNavigation()
	const { currentUser } = useAuthContext()
	const { handleSignOut } = useAppNavigation()

	const { data, isPending } = useQuery({
		queryKey: [TaskQueryKeys.getTasks],
		queryFn: GetTasksApi
	})

	const { mutate: deleteTaskMutate, isPending: isDeleteTaskPending } =
		useMutation({
			mutationFn: DeleteTaskApi,
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [TaskQueryKeys.getTasks]
				})

				Toast.show({
					type: 'info',
					text1: 'Task deleted'
				})
			}
		})

	useEffect(() => {
		if (!currentUser) {
			handleSignOut()
		}
	}, [currentUser, handleSignOut])

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
						className='my-5 mb-24'
						ItemSeparatorComponent={ItemSeparatorComponent}
						ListEmptyComponent={<EmptyList />}
						ListFooterComponentStyle={{
							marginBottom: hp(5)
						}}
						renderItem={({ item }) => (
							<Swipeable
								key={item._id}
								renderRightActions={() =>
									renderDeleteAction({
										isPending: isDeleteTaskPending,
										deleteAction: () => deleteTaskMutate(item._id)
									})
								}>
								<TouchableOpacity
									className='border border-plo-purple-300 p-3 rounded-lg space-y-4 bg-white'
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
							</Swipeable>
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

const renderDeleteAction = ({
	deleteAction,
	isPending
}: {
	deleteAction: () => void
	isPending: boolean
}) => (
	<TouchableOpacity
		className='flex items-center my-auto mx-4'
		style={{
			width: wp(10)
		}}
		onPress={() => deleteAction()}
		disabled={isPending}>
		<TrashIcon size={wp(6)} color='red' />
	</TouchableOpacity>
)

export const EmptyList = () => {
	const { homeTabNavigation } = useHomeTabNavigation()
	return (
		<View className='flex-1'>
			<View className='flex justify-center items-center h-[50vh] space-y-4'>
				<QueueListIcon size={wp(15)} color={colors['purple-100']} />
				<Text className='text-lg'> No Active Task</Text>
				<Button
					className='w-1/2 bg-plo-purple-300'
					variant='secondary'
					onPress={() => homeTabNavigation.navigate('CreateTask')}>
					Create New Task
				</Button>
			</View>
		</View>
	)
}
