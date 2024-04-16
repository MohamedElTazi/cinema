import Joi from "joi";

export const createSalleValidation = Joi.object<CreateSalleValidationRequest>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    capacity: Joi.number().min(15).max(30).required(),
}).options({ abortEarly: false });

export interface CreateSalleValidationRequest {
    name: string
    description: string
    type: string
    capacity: number
}

export const updateSalleValidation = Joi.object<UpdateSalleRequest>({
    id: Joi.number().required(),
    capacity: Joi.number().min(1).optional()
})

export interface UpdateSalleRequest {
    id: number
    capacity?: number
}

export const salleIdValidation = Joi.object<SalleIdRequest>({
    id: Joi.number().required(),
})

export interface SalleIdRequest {
    id: number
}

export const listSalleValidation = Joi.object<ListSalleRequest>({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
    capacityMax: Joi.number().min(1).optional()
})

export interface ListSalleRequest {
    page?: number
    limit?: number
    capacityMax?: number
}