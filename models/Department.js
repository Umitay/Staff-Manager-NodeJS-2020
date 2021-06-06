const BaseModel = require('../models/BaseModel')
const ObjectID = require('mongodb').ObjectID
module.exports = class Department extends BaseModel {
    collection = 'department'

    constructor(name, id, manager_id) {
        super();
        this.id = id
        this.name = name
        this.manager_id = manager_id
    }

    getLargestDepartment(database, emp) {
        let self = this
        return new Promise(async (resolve, reject) => {
            try {
                let aggregated = await emp.groupEmployeeByDepartment(database);
                let department = await self.find(database, ObjectID(aggregated[0]._id))
                return resolve(department)
            } catch (e) {
                return reject(e)
            }
        })
    }

}


