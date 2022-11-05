//Constante JavaScript:
//MineLegth:
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
};

//Trim
const requiredValidator = value => {
    return value.trim() !== '';
};

//Un re, regex, pentru email: ToLowerCase?
const emailValidator = value => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
};

//Pentru validare, are 2 parametrii;
const validate = (value, rules) => {
    let isValid = true;

    //Trebuie trecute reguli:
    //Cele 3 de mai sus:
    //Daca le trece, ramane validat!
    for (let rule in rules) {
        switch (rule) {
            case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]);
                              break;

            case 'isRequired': isValid = isValid && requiredValidator(value);
                               break;

            case 'emailValidator': isValid = isValid && emailValidator(value);
                                   break;
            default: isValid = true;
        }
    }

    return isValid;
};



//De ce doar la validate dai export?
//De ce vrei sa folosesti doar asta?
//Nu stiu, dar tot la const dai;
export default validate;








