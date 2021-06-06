const BaseModel = require('../models/BaseModel')
module.exports = class Employee extends BaseModel {
    collection = 'employees'

    constructor(name, id) {
        super();
        this.id = id
        this.name = name
    }

    groupEmployeeByDepartment(database) {
        let currentCollection = this.collection
        return new Promise((resolve, reject) => {
            database.collection(currentCollection).aggregate([
                {
                    '$group': {
                        '_id': '$department_id',
                        'Employees': {
                            '$addToSet': '$name'
                        },
                        'total': {
                            '$sum': 1
                        }
                    }
                }, {
                    '$sort': {
                        'total': -1
                    }
                }
            ]).toArray((err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            })
        })
    }
}