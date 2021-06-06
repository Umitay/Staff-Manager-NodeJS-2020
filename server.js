const express = require('express')
const config = require('config')
const employeeRouter = require('./routers/employee.routes')
const deptRouter = require('./routers/dept.routers')
const app = express()
const PORT = config.get('port')
app.use(express.json())
app.use('/api/emp/', employeeRouter)
app.use('/api/dept/', deptRouter)

try {
    app.listen(PORT, () => {
        console.log('started')
    })

} catch (e) {
    console.log(e.message);
    process.exit(1);
}