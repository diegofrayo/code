const ValidationError = function ValidationError(
  ruleName,
  message,
  value,
  validatedPropertyName,
) {
  this.ruleName = ruleName;
  this.message = message || 'Wrong value';
  this.value = value;
  this.name = validatedPropertyName;
};

export default ValidationError;
