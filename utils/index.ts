import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const colors = Object.freeze({
	white: '#ffffff',
	black: '#000000',
	'purple-100': '#613BE7',
	'purple-200': '#F0EDFD',
	'purple-300': '#aa96da'
})

export { queryClient } from './query-client'
