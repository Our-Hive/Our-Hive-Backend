import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotEmptyArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotEmptyArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Array.isArray(value) && value.length > 0;
        },
      },
    });
  };
}
