import Database from "@seald-io/nedb"

export const DATABASES = {
    SESSION_DATABASE: "session"
}

export const database = (name) => {
    const _db = {}

    const db = new Database({
        filename: `databases/${name}.db`,
        autoload: true
        // beforeSerialization: encrypt
        // afterDeserialization: decrypt
    })

    db.persistence.compactDatafile()

    for (const i of ["insert", "find", "findOne", "count", "update"]) {
        // what about find({}).sort({ planet: 1 }).skip(1).limit(2).exec()?

        _db[i] = (...args) =>
            new Promise((resolve, reject) =>
                db[i](...args, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            )
    }

    return _db
}
