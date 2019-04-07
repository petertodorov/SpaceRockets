export default async function fetchRockets (url) {
    try {
        let response = await fetch(url)
        let data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}
