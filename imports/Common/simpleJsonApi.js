export const simpleJsonApi =
    (schema, cb) => async (request, response) => {
        const { body, url, method } = request

        console.log("[catacomb]: ", url)

        if (method !== "POST") {
            const responseBody = {
                error: "You must use a POST request"
            }
            console.error(
                "[catacomb]: ",
                JSON.stringify(responseBody, null, 2)
            )
            response.writeHead(405)
            return response.end(JSON.stringify(responseBody))
        }

        if (schema !== null) {
            const { error } = schema.validate(body, {
                abortEarly: false
            })

            if (error) {
                const responseBody = { error: error.details }
                console.error(
                    "[catacomb]: ",
                    JSON.stringify(responseBody, null, 2)
                )
                response.writeHead(400)
                return response.end(JSON.stringify(responseBody))
            }
        }

        try {
            const result = await cb(body)

            if (typeof result === "undefined") {
                console.log("[catacomb]: ", { result: "" })
                return response.end(JSON.stringify({ result: "" }))
            } else {
                console.log("[catacomb]: ", { result })
                return response.end(JSON.stringify({ result }))
            }
        } catch (error) {
            console.error(
                "[catacomb]: ",
                JSON.stringify({ error: error.message }, null, 2)
            )
            response.writeHead(500)
            return response.end(
                JSON.stringify({ error: error.message })
            )
        }
    }
