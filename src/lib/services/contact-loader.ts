import { type NDKUser } from '@nostr-dev-kit/ndk'
import { createProfileQuery, ProfileNotFoundError } from '$lib/queries/follows.query'
import { writable, type Readable } from 'svelte/store'
import { resolveQuery } from '$lib/utils/queries.utils'

interface LoadingProgress {
	total: number
	loaded: number
	failed: number
	isComplete: boolean
}

export class ContactLoaderService {
	private BATCH_SIZE = 30
	private CONCURRENT_BATCHES = 3

	private progress = writable<LoadingProgress>({
		total: 0,
		loaded: 0,
		failed: 0,
		isComplete: false
	})

	getProgress(): Readable<LoadingProgress> {
		return { subscribe: this.progress.subscribe }
	}

	async loadContacts(contacts: NDKUser[]) {
		this.progress.set({
			total: contacts.length,
			loaded: 0,
			failed: 0,
			isComplete: false
		})

		try {
			const batches = this.createBatches(contacts)

			for (let i = 0; i < batches.length; i += this.CONCURRENT_BATCHES) {
				const currentBatches = batches.slice(i, i + this.CONCURRENT_BATCHES)
				await Promise.all(currentBatches.map((batch) => this.processBatch(batch)))
			}
		} catch (error) {
			console.error('Contact loading error:', error)
		} finally {
			this.progress.update((p) => ({ ...p, isComplete: true }))
		}
	}

	private createBatches(contacts: NDKUser[]): NDKUser[][] {
		return contacts.reduce<NDKUser[][]>((batches, contact, index) => {
			const batchIndex = Math.floor(index / this.BATCH_SIZE)
			if (!batches[batchIndex]) {
				batches[batchIndex] = []
			}
			batches[batchIndex].push(contact)
			return batches
		}, [])
	}

	private async processBatch(batch: NDKUser[]) {
		await Promise.all(
			batch.map(async (contact) => {
				try {
					await resolveQuery(() => createProfileQuery(contact.pubkey))
					this.progress.update((p) => ({
						...p,
						loaded: p.loaded + 1
					}))
				} catch (error) {
					if (error instanceof ProfileNotFoundError) {
						console.info(`Profile not found for ${contact.pubkey}`)
					} else {
						console.warn(`Error loading profile for ${contact.pubkey}:`, error)
					}

					this.progress.update((p) => ({
						...p,
						loaded: p.loaded + 1,
						failed: p.failed + 1
					}))
				}
			})
		)
	}
}

export const contactLoader = new ContactLoaderService()
