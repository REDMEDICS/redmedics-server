import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    APPNAME: Joi.string().required(),
    APPVERSION: Joi.string().required(),
    APP_PORT: Joi.number().default(3000),
    COOKIE_DOMAIN: Joi.string().required(),

  
    MONGO_URI: Joi.string().uri().required(),
    
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    ACCESS_TOKEN_EXPIRY: Joi.string().required(),
    ACCESS_TOKEN_EXPIRY_IN_SECONDS: Joi.number().required(),
    REFRESH_TOKEN_SECRET: Joi.string().required(),
    REFRESH_TOKEN_EXPIRY: Joi.string().required(),
    REFRESH_TOKEN_EXPIRY_IN_SECONDS: Joi.number().required(),
});
