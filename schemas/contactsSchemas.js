import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "name must be exist",
        "string.base": "name must be string"
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "any.required": "email must be exist",
        "string.base": "email must be string"
    }),
    phone: Joi.string().regex(/^[0-9]{10}$/).required().messages({
        "any.required": "phone must be exist"
    })
})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ tlds: { allow: false } }),
    phone: Joi.string().regex(/^[0-9]{10}$/)
}).options({ stripUnknown: true, abortEarly: false });

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });