import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPastDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsPastDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value instanceof Date && value <= new Date();
        },
        defaultMessage() {
          return 'Birth date should not be in the future';
        },
      },
    });
  };
}
