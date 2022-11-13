//No need, no inputs for post:
/*
const nameValidator = value => {
    const re = /^[A-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return re.test(String(value));
};

const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
};

const isRequiredValidator = value => {
    return value.trim() !== '';
};

const passwordValidator = value => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,10}$/;
    return re.test(String(value));
};


const validate = (value, rules) => {
    let isValid = true;

    for (let rule in rules) {
        switch (rule) {
            case 'nameValidator': isValid = isValid && nameValidator(value);
                                  break;
            case 'minLengthValidator': isValid = isValid && minLengthValidator(value, rules[rule]);
                              break;
            case 'isRequiredValidator': isValid = isValid && isRequiredValidator(value);
                               break;
            case 'passwordValidator': isValid = isValid && passwordValidator(value);
                                      break;
            default: isValid = true;
        }
    }

    return isValid;
};

export default validate;
*/






