const Employee = require('../models/Employee')
const Department = require('../models/Department')
const {Router} = require('express')
const DBService = require('../services/MongoDB');
const ObjectID = require('mongodb').ObjectID
const config = require('config')
const employeeRouter = Router()

employeeRouter.post('/add', async (req, res) => {
    try {
        const {name, email, manager_id, department_id} = req.body
        let emp = new Employee();
        const connection = await DBService.Get()
        const database = await connection.db(config.get('database'))
        const employee = await emp.find(database, {email: email})

        if (employee) {
            return res.status(400).json({message: ` The employee with ${email} already exists.`})
        } else {
            let data = {name: name, email: email, manager_id: manager_id, department_id: department_id}
            await emp.insert(database, data)
            return res.status(201).json({message: 'Employee has been created.'})
        }
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error.'})
    }

})


employeeRouter.put('/assign-to-manager', async (req, res) => {
    try {
        const {manager_id, employee_id} = req.body
        let emp = new Employee();
        const connection = await DBService.Get()
        const database = await connection.db(config.get('database'))

        //check employee
        const manager = await emp.find(database, ObjectID(manager_id))
        const employee = await emp.find(database, ObjectID(employee_id))

        if (manager && employee) {
            await emp.update(database, {
                manager_id: manager_id,
                department_id: manager.department_id
            }, {"_id": ObjectID(employee_id)})
            return res.status(201).json({message: `Employee has been assigned to ${manager_id}.`})
        } else {
            return res.status(400).json({message: "Bad request."})
        }

    } catch (e) {
        res.status(500).json({message: 'Internal Server Error.'})
    }
})
employeeRouter.put('/assign-to-department', async (req, res) => {
    try {
        const {department_id, employee_id} = req.body
        let emp = new Employee();
        let dept = new Department();
        const connection = await DBService.Get()
        const database = await connection.db(config.get('database'))
        const employee = await emp.find(database, ObjectID(employee_id))
        const department = await dept.find(database, ObjectID(department_id))

        if (employee && department) {
            await emp.update(database, {department_id: department_id}, {"_id": ObjectID(employee_id)})
            await dept.update(database, {manager_id: employee_id}, {"_id": ObjectID(department_id)})
            return res.status(201).json({message: `Employee has been assigned to ${department_id}.`})
        } else {
            return res.status(400).json({message: "Bad request."})
        }

    } catch (e) {
        res.status(500).json({message: 'Internal Server Error.'})
    }
})
employeeRouter.get('/list', async (req, res) => {

    try {
        let emp = new Employee();
        const connection = await DBService.Get()
        const database = await connection.db(config.get('database'))
        let employeeList = await emp.list(database)
        console.log('employeeList', employeeList);
        res.status(200).json(employeeList)
    } catch (e) {
        res.status(500).json({'rc': 'deptRouter', error: e, message: 'Internal Server Error.'})
    }
})
module.exports = employeeRouter