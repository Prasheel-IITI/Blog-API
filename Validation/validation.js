const Joi= require('@hapi/joi')

const registerValidation= function(data){
    const schema= Joi.object({
        Email: Joi.string().required().min(3).email(),
        Password: Joi.string().required().min(6),
        Name: Joi.string().required().max(40)
    })

    return schema.validate(data);

}

const loginValidation= function (data) {
    const schema=Joi.object({
        Email: Joi.string().required().min(3).email(),
        Password: Joi.string().required().min(6)
    })

    return schema.validate(data);
}

const storyValidation= function (data){
    const schema=Joi.object({
        Title: Joi.string().required(),
        Content: Joi.string().required()
    })

    return schema.validate(data);
}

module.exports.registerValidation =registerValidation;
module.exports.loginValidation =loginValidation;
module.exports.storyValidation =storyValidation;
