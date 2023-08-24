import { writable } from 'svelte/store'
import { PUBLIC_VITE_LOCALE } from '$env/static/public'
export const locale = writable<string>(PUBLIC_VITE_LOCALE)