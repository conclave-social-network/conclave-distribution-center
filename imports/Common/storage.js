import { APP_NAME } from "/imports/Common/constants"

let _localStorage = {
    setItem() {},
    getItem() {}
}

if (process.browser) {
    _localStorage = window.localStorage
}

const storage = {
    get(key) {
        return JSON.parse(_localStorage.getItem(`${APP_NAME}.${key}`))
    },

    set(key, value) {
        return _localStorage.setItem(
            `${APP_NAME}.${key}`,
            JSON.stringify(value)
        )
    }
}

export default storage
