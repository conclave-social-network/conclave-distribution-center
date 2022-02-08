import { simpleJsonApi } from "/imports/Common/simpleJsonApi"
import { getKeys } from "/imports/PublicKeys/PublicKeys.model"

export const PublicKeysApi = (router) => {
    router.post(
        "/registration/getKeys",
        simpleJsonApi(null, () =>
            getKeys().map(({ ip, publicKey }) => ({ ip, publicKey }))
        )
    )
}
