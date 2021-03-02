export const checkUrl = (url) => {
    if (!url.includes('http') && !url.includes('https')) return `//${url}`
    else return url
}