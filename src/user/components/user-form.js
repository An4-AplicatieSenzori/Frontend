//Import:
import React from 'react';
import validate from "./validators/user-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/user-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';

//Componenta react:
class UserForm extends React.Component {

    //Constructor props:
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            errorStatus: 0,
            error: null,
            formIsValid: false,
            //Ce iti apare:
            formControls: {
                name: {
                    value: '',
                    placeholder: 'What is your name?',
                    valid: false,
                    touched: false,
                    //Validari simple:
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                email: {
                    value: '',
                    placeholder: 'Email',
                    valid: false,
                    touched: false,
                    validationRules: {
                        emailValidator: true
                    }
                },
                age: {
                    value: '',
                    placeholder: 'Age',
                    valid: false,
                    touched: false,
                },
                address: {
                    value: '',
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21',
                    valid: false,
                    touched: false,
                },
                password: {
                    value: '',
                    placeholder: '********',
                    valid: false,
                    touched: false,
                    validationRules: {
                        passwordValidator: true
                    }
                },
            }
        };

        //Ceva pentru bind;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //?
    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    //Cand schimbi:
    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        const updatedControls = this.state.formControls;
        const updatedFormElement = updatedControls[name];

        //Cand faci update:
        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    };

    //Inserari successful!
    registerUser(user) {
        return API_USERS.postUser(user, (result, status, error) => {
            //Te uiti la statusul returnat!
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted user with id: " + result + " !");
                this.reloadHandler();
                //Si erori handling:
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    //Cand dai submit, salvezi valorile;
    handleSubmit() {
        let user = {
            name: this.state.formControls.name.value,
            email: this.state.formControls.email.value,
            age: this.state.formControls.age.value,
            address: this.state.formControls.address.value,
            password: this.state.formControls.password.value
        };

        //Log in consola, si registrezi!
        console.log(user);
        this.registerUser(user);
    }

    //Render la persoana: Multe componente noi:
    //{this.state.formControls.name.placeholder}
    //De ce nu scrie modala aici???
    render() {
        return (
            <div>
                <FormGroup id='name' style = {{backgroundColor: "#549be2"}}>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters! </div>}
                </FormGroup>

                <FormGroup id='email' style = {{backgroundColor: "#549be2"}}>
                    <Label for='emailField'> Email: </Label>
                    <Input name='email' id='emailField' placeholder={this.state.formControls.email.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.email.value}
                           touched={this.state.formControls.email.touched? 1 : 0}
                           valid={this.state.formControls.email.valid}
                           required
                    />
                    {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
                    <div className={"error-message"}> * Email must have a valid format! </div>}
                </FormGroup>

                <FormGroup id='address' style = {{backgroundColor: "#549be2"}}>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='age' style = {{backgroundColor: "#549be2"}}>
                    <Label for='ageField'> Age: </Label>
                    <Input name='age' id='ageField' placeholder={this.state.formControls.age.placeholder}
                           min={0} max={100} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.age.value}
                           touched={this.state.formControls.age.touched? 1 : 0}
                           valid={this.state.formControls.age.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='password' style = {{backgroundColor: "#549be2"}}>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                        <div className={"error-message"}> * Password must have a valid format! </div>}
                </FormGroup>

                    <Row>
                        <Col sm={{size: '4', offset: 5}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}
                            style = {{backgroundColor: '#ab1111'}}>  Submit </Button>
                        </Col>
                    </Row>
                {
                    //Cod C: Return erori! Poti in Div pune cod asa!
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

//Export!
export default UserForm;

/*
<!-- Buton submit: -->
<!-- Age: -->
<!-- Address: -->
<!-- Email: -->
<!-- Nume: -->
*/








