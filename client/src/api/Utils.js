/* General helpful functions which are used App-wide */

export function isValid(object, schema) {
  let Ajv = require('ajv');
  let ajv = new Ajv();
  let validate = ajv.compile(schema);
  return validate(object);
}