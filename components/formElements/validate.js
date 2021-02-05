export const RULE_VALIDATOR_REQUIRED = "REQUIRED";
export const RULE_VALIDATOR_MINLENGTH = "MINLENGTH";
export const RULE_VALIDATOR_MAXLENGTH = "MAXLENGTH";
export const RULE_VALIDATOR_EMAIL = "EMAIL";

export const validate = (value, rules) => {
  let isValid = true;

  for (let rule of rules) {
    switch (rule) {
      case RULE_VALIDATOR_REQUIRED:
        isValid = isValid && value.trim() !== "";
        break;
      case RULE_VALIDATOR_MINLENGTH:
        isValid = isValid && value.length >= rule.value;
        break;
      case RULE_VALIDATOR_MAXLENGTH:
        isValid = isValid && value.length <= rule.value;
        break;
      case RULE_VALIDATOR_EMAIL:
        isValid = isValid && (/\S+@\S+\.\S+/.test(value))
        break;
      default:
        console.log('def')

        break;
    }
  }
  return isValid;
};
