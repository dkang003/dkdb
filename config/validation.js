const Joi = require('joi');

const registrationValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().min(5).alphanum().required(),
        lastname: Joi.string().min(3).alphanum().required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;