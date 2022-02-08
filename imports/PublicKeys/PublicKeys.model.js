import { Mongo } from "meteor/mongo"
import keypair from "keypair"
import fetch from "isomorphic-fetch"

const PublicKeyCollection = new Mongo.Collection("publicKeys")

export const generateLocalKey = async () => {
    const { public: publicKey, private: privateKey } = keypair({
        bits: 4096
    })

    const response = await fetch("http://api.ipify.org")
    const ip = await response.text()

    storePublicKeys({
        ip,
        privateKey,
        publicKey
    })
}

export const storePublicKeys = ({ ip, privateKey, publicKey }) =>
    PublicKeyCollection.insert({
        ip,
        privateKey,
        publicKey,
        local: true
    })

export const getLocalKey = () => {
    const keys = PublicKeyCollection.find({ local: true }).fetch()

    if (keys.length !== 1) {
        return null
    } else {
        return keys[0]
    }
}

export const getKeys = () => PublicKeyCollection.find({}).fetch()
