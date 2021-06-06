const {oneOf, check, validationResult} = require("express-validator")
const addMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') return next()
    console.log("run addMiddleware")
    next();
}
const assignMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') return next()
    console.log("run assignMiddleware")
    try {
        oneOf([check('manager_id', 'The field is not correct').isEmpty(),
            check("employee_id", 'The field is not correct').isEmpty()
        ])
        validationResult(req).throw();
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = addMiddleware,assignMiddleware