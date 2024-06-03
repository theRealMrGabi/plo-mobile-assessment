import React from 'react'
import {
	createContext,
	useContext,
	useState,
	useMemo,
	Dispatch,
	SetStateAction,
	PropsWithChildren,
	useEffect
} from 'react'
import { User, UserToken } from '../interface'
import { _storageKeys, retrieveObjectFromStorage } from '../../utils'

interface Props {
	currentUser: User | null
	setCurrentUser: Dispatch<SetStateAction<User | null>>
	isUserLoading: boolean
	setIsUserLoading: React.Dispatch<React.SetStateAction<boolean>>
	userToken: UserToken | null
	setUserToken: React.Dispatch<React.SetStateAction<UserToken | null>>
}

export const AuthContext = createContext<Props | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const { Provider } = AuthContext

	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [userToken, setUserToken] = useState<UserToken | null>(null)
	const [isUserLoading, setIsUserLoading] = useState(false)

	useEffect(() => {
		setIsUserLoading(true)

		retrieveObjectFromStorage(_storageKeys.user)
			.then(localUser => {
				setCurrentUser(localUser)
				setIsUserLoading(false)
			})
			.catch(err => {
				console.error('error --->', err)
				setIsUserLoading(false)
			})

		retrieveObjectFromStorage(_storageKeys.userToken)
			.then(response => {
				setUserToken(response)
			})
			.catch(err => console.error('error --->', err))
	}, [])

	const value = useMemo(
		() => ({
			currentUser,
			setCurrentUser,
			isUserLoading,
			setIsUserLoading,
			userToken,
			setUserToken
		}),
		[
			currentUser,
			setCurrentUser,
			isUserLoading,
			setIsUserLoading,
			userToken,
			setUserToken
		]
	)

	return <Provider value={value}>{children}</Provider>
}

export const useAuthContext = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('Context must be provided')
	}
	return context
}
