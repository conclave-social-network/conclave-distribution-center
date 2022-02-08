import "/imports/App/App.api"
import {
    generateLocalKey,
    getLocalKey
} from "/imports/PublicKeys/PublicKeys.model"
import { Meteor } from "meteor/meteor"

Meteor.startup(async () => {
    const localKey = getLocalKey()

    if (localKey === null) {
        generateLocalKey()
    }
})
