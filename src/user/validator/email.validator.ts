import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "../user.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface{
    
    constructor(private userRepository: UserRepository){}
    
    async validate(value: any, validationArguments?: ValidationArguments):Promise<boolean> {
        const userEmailExists = await this.userRepository.checkEmail(value);
        return !userEmailExists;
    }  
}

export const uniqueEmail = (validationOptions: ValidationOptions) => {
    return (object: Object, property: string ) => {
       registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator:  EmailValidator
        });
    }
}