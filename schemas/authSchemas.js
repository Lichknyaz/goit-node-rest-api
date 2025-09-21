import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().trim().min(1).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required(),
})

export const resendVerifySchema = Joi.object({
    email: Joi.string().trim().email().required(),
});