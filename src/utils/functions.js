export const checkUrl = (url) => {
	if (!url.includes('http') && !url.includes('https')) return `//${url}`
	else return url
}

export const filterByDate = (obj) => {
	if (new Date(obj.date + 'T' + obj.time) >= new Date()) return true
	else return false
}