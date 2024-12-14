export const queryKeys = {
	users: {
		all: ['user'] as const,
		detail: (pubkey?: string) => [...queryKeys.users.all, pubkey] as const,
		follows: (pubkey?: string) => [...queryKeys.users.detail(pubkey), 'follows'] as const,
		profile: (pubkey?: string) => [...queryKeys.users.detail(pubkey), 'profile'] as const,
		relays: (pubkey?: string) => [...queryKeys.users.detail(pubkey), 'relays'] as const
	}
} as const
