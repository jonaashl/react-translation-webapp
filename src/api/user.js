import { createHeaders } from "./index"
const apiUrl = process.env.REACT_APP_API_URL

const checkForUser = async username => {
    try {
        const response = await fetch(`${apiUrl}?username=${username}`)
        if (!response.ok) {
            throw new Error("Could not complete fetch request.")
        }

        const data = await response.json()
        return [null, data]
    } catch (error) {
        return [error.message, []]
    }
}

const createUser = async username => {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: createHeaders(),
            body: JSON.stringify({
                username,
                translations: [],
            }),
        })
        if (!response.ok) {
            throw new Error("Could not create user with username " + username)
        }

        const data = await response.json()
        return [null, data]
    } catch (error) {
        return [error.message, []]
    }
}

export const loginUser = async username => {
    const [error, user] = await checkForUser(username)

    if (error !== null) {
        return [error, null]
    }

    if (user.length > 0) {
        return [null, user.pop()]
    }

    return await createUser(username)
}

export const userById = async userId => {
    try {
        const response = await fetch(`${apiUrl}/${userId}`)
        if (!response.ok) {
            throw new Error("Could not fetch user")
        }
        const user = await response.json()
        return [null, user]
    } catch (error) {
        return [error.message, null]
    }
}
