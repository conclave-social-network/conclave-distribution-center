import connectRoute from "connect-route"
import bodyParser from "body-parser"
import { PublicKeysApi } from "/imports/PublicKeys/PublicKeys.api"

WebApp.connectHandlers.use(bodyParser.json())

WebApp.connectHandlers.use(
  "/api",
  connectRoute((router) => {
    PublicKeysApi(router)
  })
)
