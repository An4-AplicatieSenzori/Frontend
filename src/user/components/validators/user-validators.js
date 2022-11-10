//Constante JavaScript:
//Am terminat validarile;

//Hook:
//1) Pentru litera mare, fara cifre, cu spatii intre nu la final;
const nameValidator = value => {
    const re = /^[A-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/; //re = /^[A-Z,.'-]+$/i;
    return re.test(String(value));
};

//Un re, regex, pentru email: ToLowerCase?
const emailValidator = value => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
};

//MineLegth:
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength; //True daca este mai mare, else false;
};

//Trim
const requiredValidator = value => {
    return value.trim() !== ''; //Required;
};

const ageValidator = (value, [minL, maxL]) => {
    if(value >= minL && value <= maxL)
    {
        return true;
    }
    return false;
};

const roleValidator = value => {
    return ((value === 'admin') || (value === 'client'));
}

//Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
//aaaaaA-1
const passwordValidator = value => {
    //return value.trim() !== '';
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,10}$/;
    return re.test(String(value));
};



//Pentru validare, are 2 parametrii;
const validate = (value, rules) => {
    let isValid = true;

    //Trebuie trecute reguli:
    //Cele 3 de mai sus:
    //Daca le trece, ramane validat!
    for (let rule in rules) {
        switch (rule) {
            case 'nameValidator': isValid = isValid && nameValidator(value);
                                  break;
            case 'emailValidator': isValid = isValid && emailValidator(value);
                                   break;
            case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]);
                              break;
            case 'isRequired': isValid = isValid && requiredValidator(value);
                               break;
            case 'ageValidator': isValid = isValid && ageValidator(value, rules[rule]);
                                 break;
            case 'passwordValidator': isValid = isValid && passwordValidator(value);
                                      break;
            case 'roleValidator': isValid = isValid && roleValidator(value);
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








