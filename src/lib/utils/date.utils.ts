import { format, formatDistanceToNow, fromUnixTime } from 'date-fns'

export function formatDate(timestamp: number | undefined): string {
	return timestamp ? format(fromUnixTime(timestamp), 'PPP') : 'Unknown'
}

export function formatRelativeTime(timestamp: number | undefined): string {
	return timestamp ? formatDistanceToNow(fromUnixTime(timestamp), { addSuffix: true }) : 'Unknown'
}
