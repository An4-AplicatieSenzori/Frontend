const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
};

const requiredValidator = value => {
    return value.trim() !== '';
};

const titleValidator = value => {
    const re = /^[A-Z].*/; //Doar sa fie capitale!
    return re.test(String(value));
};

//Sa fie mai mare de 0:
const hourlyConsumptionValidator = value => {
    //return Math.abs(value - 0.0) < Number.EPSILON;
    return value >= 0.0;
};

//const emailValidator = value => {
//    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//    return re.test(String(value).toLowerCase());
//};



const validate = (value, rules) => {

    let isValid = true;

    for (let rule in rules) {
        switch (rule) {
            case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]);
                              break;
            case 'isRequired': isValid = isValid && requiredValidator(value);
                               break;
            //case 'addressRequired': isValid = isValid && addressValidator(value);
            //                        break;
            case 'titleValidator': isValid = isValid && titleValidator(value);
                                  break;
            case 'hourlyConsumptionValidator': isValid = isValid && hourlyConsumptionValidator(value);
                                              break;
            default: isValid = true;
        }
    }

    return isValid;
};

export default validate;








