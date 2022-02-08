import { Meteor } from "meteor/meteor"

export const validateWithJoi = (payload, schema) => {
    if (schema !== null) {
        const { error } = schema.validate(payload, {
            abortEarly: false
        })

        if (error) {
            throw new Meteor.Error(
                error.name,
                error.message,
                JSON.stringify(error.details)
            )
        }
    }
}

export const ValidatedMethod = (methodName, cb, schema = null) => {
    Meteor.methods({
        [methodName](payload) {
            if (Meteor.isServer) {
                // already validated on the client
                validateWithJoi(payload, schema)
            }

            return cb.call(this, payload)
        }
    })

    return (payload, callback) => {
        validateWithJoi(payload, schema)
        Meteor.call(methodName, payload, callback)
    }
}
