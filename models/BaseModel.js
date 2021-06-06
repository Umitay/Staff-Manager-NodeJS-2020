module.exports = class BaseModel {
    collection = 'default'

    find(database, condition) {
        let currentCollection = this.collection
        return new Promise(function (resolve, reject) {
            database.collection(currentCollection).findOne(condition, function (err, docs) {
                if (err) return reject(err)
                return resolve(docs)
            })
        })
    }

    insert(database, data) {
        let currentCollection = this.collection
        return new Promise((resolve, reject) => {
            database.collection(currentCollection).insertOne(data, (err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            })
        })
    }

    update(database, data, condition) {
        let currentCollection = this.collection
        return new Promise(function (resolve, reject) {
            database.collection(currentCollection).update(condition, {
                $set: data,
                $currentDate: {lastModified: true}
            }, function (err, docs) {
                if (err) return reject(err)
                return resolve(docs)
            })
        })
    }

    list(database) {
        let currentCollection = this.collection
        return new Promise(function (resolve, reject) {
            database.collection(currentCollection).find()
                .toArray(function (err, docs) {
                    if (err) return reject(err)
                    return resolve(docs)
                })
        })
    }

}