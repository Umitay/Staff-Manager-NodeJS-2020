const {Router} = require('express')
const {oneOf, check, validationResult} = require("express-validator")
const deptRouter = Router()
const DBService = require('../services/MongoDB');
const config = require('config')
const Department = require('../models/Department')
const Employee = require('../models/Employee')
deptRouter.post('/add',
    oneOf([check('name', 'The field is not correct').isLength({min: 3})]),
    async (req, res) => {
        try {
            validationResult(req).throw();
            const {name} = req.body;
            let dept = new Department();
            const connection = await DBService.Get()
            const database = await connection.db(config.get('database'))
            let department = await dept.find(database, {name: name})
            if (department) {
                return res.status(400).json({message: "The Department already exists."})
            } else {
                let department = await dept.insert(database, {name: name})
                res.status(200).json({department_id: department.insertedId, message: 'The Department has been created'})
            }

        } catch (e) {
            return res.status(500).json({error: e, message: 'Internal Server Error.'})
        }
    })
deptRouter.get('/list', async (req, res) => {
    try {
        let dept = new Department();
        const connection = await DBService.Get()
        const database = await connection.db(config.get('database'))
        res.status(200).json(await dept.list(database, {}))
    } catch (e) {
        res.status(500).json({'rc': 'deptRouter', error: e, message: 'Internal Server Error.'})
    }
})

deptRouter.get('/largest-department', async (req, res) => {

    try {
        let emp = new Employee();
        let dept = new Department();
        const connection = await DBService.Get()
        const database = await connection.db(config.get('database'))
        let department = await dept.getLargestDepartment(database, emp)
        res.status(200).json(department)
    } catch (e) {
        res.status(500).json({'rc': 'deptRouter', error: e, message: 'Internal Server Error.'})
    }
})

module.exports = deptRouter
