import Joi from "joi";
import { Types } from "mongoose"

export const objectIdValidation = (value, helper) => {
  const isValid = Types.ObjectId.isValid(value);
  return isValid ? value : helper.message("Invalid ObjectId");
};

const userNameValidation =(value, helper) => {
  const { firstName, lastName } = helper.state.ancestors[0];
  const expectedUserName = `${firstName} ${lastName}`;
  if (value !== expectedUserName) {
    return helper.error('any.invalid');
  }
  return value;
};

export const generalRules = {
  objectId: Joi.string().custom(objectIdValidation).required(),
  userName: Joi.string().custom(userNameValidation).required(),
  email : Joi.string().email({
    tlds:{ allow: ["com"]},
    minDomainSegments: 2,
    maxDomainSegments: 4,})
    .required(),
  password : Joi.string()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/
  ).required(),
  headers: {
    "content-type": Joi.string(),
    "accept": Joi.string(),
    "accept-encoding": Joi.string(),
    "host": Joi.string(),
    "content-length": Joi.string(),
    "user-agent": Joi.string(),
    "accept-language": Joi.string(),
    "accept-charset": Joi.string(),
    "postman-token": Joi.string(),
    "postman-id": Joi.string(),
    "connection" : Joi.string(),
    "token": Joi.string(),
    "companyhr" : Joi.string(),
    "addedby" : Joi.string(),
  },
};
