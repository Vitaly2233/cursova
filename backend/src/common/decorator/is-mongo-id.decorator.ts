import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Types } from 'mongoose';
import { TObjectId } from '../type/object-id.type';

export function IsMongoId(validationOptions?: ValidationOptions) {
  return function (object: { constructor: any }, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} is invalid mongodb id`,
      },
      constraints: [],
      validator: {
        validate(_value: any, args: ValidationArguments) {
          const { value } = args;

          if (validationOptions?.each) {
            const mutated = [];

            if (!Array.isArray(value)) {
              args.value = [value];
            }

            for (const item of args.value) {
              if (!Types.ObjectId.isValid(item)) {
                return false;
              }

              mutated.push(new TObjectId(item));
            }

            args.object[propertyName] = mutated;
            return true;
          }

          if (!Types.ObjectId.isValid(value)) {
            return false;
          }
          args.object[propertyName] = new TObjectId(value);

          return true;
        },
      },
    });
  };
}
