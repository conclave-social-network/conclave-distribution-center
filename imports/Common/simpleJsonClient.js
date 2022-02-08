import fetch from "isomorphic-fetch"

export const simpleJsonClient = async (url, payload = {}) => {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })

    return response.json()
}
