import type { NDKEvent } from '@nostr-dev-kit/ndk'
import { writable } from 'svelte/store'

export type DraweUiType = 'event'

export interface Drawer {
	drawerType?: DraweUiType
	event?: NDKEvent
}

export const drawerUI = writable<Drawer>({
	drawerType: undefined,
	event: undefined
})

const setDrawerState = (state: Drawer) => {
	drawerUI.set(state)
}

export const openDrawer = (drawer: Drawer) => {
	setDrawerState({
		drawerType: drawer.drawerType,
		event: drawer.event
	})
}

export const closeDrawer = () => {
	setDrawerState({
		drawerType: undefined,
		event: undefined
	})
}
