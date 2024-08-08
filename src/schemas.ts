import Joi from 'joi'

export const accountTypeSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    position: Joi.string(),
})
