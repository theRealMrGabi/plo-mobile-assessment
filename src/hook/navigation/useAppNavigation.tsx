import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/core'

import { IAppStack } from '../../interface'

export const useAppNavigation = () => {
	const appNavigation = useNavigation<NativeStackNavigationProp<IAppStack>>()

	return { appNavigation }
}
