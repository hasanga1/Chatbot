import { body, ValidationChain } from "express-validator";
import { NextFunction, Response, Request } from "express";

const validate = (validations: ValidationChain[]) => {
    return async (req.Request, res:Response, next: NextFunction) => {
        for(let validation of validations) {
            
        }
    }
}

const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).withMessage("Password should contain at least 6 characters"),
]