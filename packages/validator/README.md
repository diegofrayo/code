# validator

## Description

Library to validate types and object schemes



## Installation

**Yarn**
```
yarn add @diegofrayo/validator --save
```

**NPM**
```
npm install @diegofrayo/validator --save
```



## Usage

### Creating some validators

- Validate a number
  ```
  import { vlt } from '@diegofrayo/validator';

  const rule = vlt()
    .number()
    .min(5);

  console.log(rule.validate(6)); // output: true
  ```

- Validate a string
  ```
  const rule = vlt()
    .string()
    .minLength(5);

  console.log(rule.validate(4)); // output: false
  ```

- Validate and get errors
  ```
  console.log(
    vlt()
      .boolean()
      .validate('test', { getErrors: true }),
  );

  // output
  {
    isValid: false,
    errors: [
      {
        ruleName: 'boolean',
        message: 'Current value is not boolean',
        value: 'test',
        name: undefined,
      },
    ],
  }
  ```

- Async validation
  ```
  const { isValid, errors } = await vlt()
    .string()
    .minLength(5)
    .validate('diego', { getErrors: true, async: true });

  console.log(isValid, errors); // output: true, []
  ```


### Validate schemes

- Define the schemes
  ```
  const studentScheme = vlt.scheme({
    name: vlt().string(),
    email: vlt().email(),
    age: vlt()
      .number()
      .min(18),
  });

  const teacherScheme = vlt.scheme({
    name: vlt().string(),
    email: vlt().email(),
    isAdult: vlt().boolean(),
  });

  const roomScheme = vlt.scheme({
    number: vlt().number(),
    teacher: teacherScheme,
    students: vlt().arrayOf(studentScheme),
  });
  ```

- Define an object to validate
  ```
  const objectToValidate = {
    number: 1,
    teacher: { name: 'Teacher', email: 'email@g.co', isAdult: true },
    students: [{ name: 'name', email: 'email@g.co', age: 18 }],
  };
  ```

- Now you can validate it
  ```
  const validationResult = roomScheme.validate(objectToValidate, { getErrors: true });
  console.log(validationResult); // output: { isValid: true, errors: []}
  ```

- An example showing the validation errors
  ```
  objectToValidate.students = objectToValidate.students.concat([
    '33',
    3232,
    true,
    [],
    { name: 232, email: 'wrong-email' },
  ]);
  const validationResult = roomScheme.validate(objectToValidate, { getErrors: true });

  // output
  {
    isValid: false,
    errors: [
      {
        ruleName: 'arrayOf',
        message: 'The items of the given array are not valid',
        value: [Array],
        name: 'object => students',
      },
      {
        ruleName: 'scheme',
        message: 'Invalid object to validate, you are trying to validate a string',
        value: '33',
        name: 'scheme',
      },
      {
        ruleName: 'scheme',
        message: 'Invalid object to validate, you are trying to validate a number',
        value: 3232,
        name: 'scheme',
      },
      ...
    ],
  }
  ```


### TypesValidator

Some examples about how to use this object

```
console.log(TypesValidator.isArray([1, 3, ''])); // true
console.log(TypesValidator.isArrayOf([1, 2, 3, 4], 'number')); // true
console.log(TypesValidator.isBoolean('true')); // false
console.log(TypesValidator.isNumber("5")); // false
console.log(TypesValidator.isString('hello')); // true
```

In the API section you can see all available methods



## API

### vlt

`array` | `arrayOf` | `boolean` | `number` | `string` | `customValidation` | `email` | `date` | `regex` | `min` | `max` | `minLength` | `maxLength` | `allowEmpty` | `notAllowEmpty`


### TypesValidator

`isArray` | `isArrayOf` | `isBoolean` | `isFunction` | `isNumber` | `isObject` | `isString` | `isVLTObjectScheme` | `isPromise` | `isDate` | `isEmail`
