import { registerDecorator, ValidationOptions } from 'class-validator';

export const IsValidDays = (validationOptions?: ValidationOptions) => {
  return (object, propertyName) => {
    registerDecorator({
      name: 'CountDays',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: 'Inncorect cout of day',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const regex =
            /^(?:\d\d?|[12]\d{2}|3[0-5]\d|36[0-6])\/(?:\d\d?|[12]\d{2}|3[0-5]\d|36[0-6])$/;
          return typeof value === 'string' && regex.test(value);
        },
      },
    });
  };
};
