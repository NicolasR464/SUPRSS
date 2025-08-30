export const timeAgo = (timestamp: number) => {
    const now = Date.now()
    const diff = Math.floor((now - timestamp) / 1000) // in seconds

    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
}
