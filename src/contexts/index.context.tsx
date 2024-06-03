import React from 'react'
import type { PropsWithChildren } from 'react'

import { AuthProvider } from './auth.context'

export const Providers = ({ children }: PropsWithChildren) => {
	return <AuthProvider>{children}</AuthProvider>
}
