// lib/stores/drawer.ts
import type { NDKEvent } from '@nostr-dev-kit/ndk'
import { writable } from 'svelte/store'

export type DrawerUiType = 'event' | 'event-tools'

export interface DrawerEventTools {
	kind: number
	action?: 'view' | 'backup' | 'export'
}

export interface Drawer {
	drawerType?: DrawerUiType
	event?: NDKEvent
	eventTools?: DrawerEventTools
}

export const drawerUI = writable<Drawer>({
	drawerType: undefined,
	event: undefined,
	eventTools: undefined
})

export const openDrawer = (drawer: Drawer) => {
	drawerUI.set(drawer)
}

export const openEventTools = (kind: number, action: 'view' | 'backup' | 'export' = 'view') => {
	drawerUI.set({
		drawerType: 'event-tools',
		eventTools: { kind, action }
	})
}

export const closeDrawer = () => {
	drawerUI.set({
		drawerType: undefined,
		event: undefined,
		eventTools: undefined
	})
}
