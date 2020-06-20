const joi = require('@hapi/joi');

const userScheme = {
    first_name: joi.string().max(50).required(),
    last_name: joi.string().max(50),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone: joi.string()
};

const validate = user => joi.validate(user, userScheme);

module.exports = validate;