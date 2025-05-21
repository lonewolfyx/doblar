export const cleanUrl = (url: string): string => url.replace(/#.*$/s, '').replace(/\?.*$/s, '')
