import Joi from "joi";

export const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
});


export const signinSchema  = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});