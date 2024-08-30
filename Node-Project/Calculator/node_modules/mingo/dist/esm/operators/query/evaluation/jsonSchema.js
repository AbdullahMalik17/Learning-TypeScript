import { MingoError } from "../../../util";
function $jsonSchema(_, schema, options) {
  if (!options?.jsonSchemaValidator) {
    throw new MingoError(
      "Missing option 'jsonSchemaValidator'. Configure to use '$jsonSchema' operator."
    );
  }
  const validate = options?.jsonSchemaValidator(schema);
  return (obj) => validate(obj);
}
export {
  $jsonSchema
};
