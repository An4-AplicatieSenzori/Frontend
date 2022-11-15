import React from 'react';
import validate from "./validators/client-validators";
import Button from "react-bootstrap/Button";
import * as API_CLIENT from "../api/client-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';

class ClientFormDescription extends React.Component {

    //Variabila client pentru retinere resultat:
    //Trebuie asa cred!!!
    clientCurent = {
        name: '',
        email: '',
        age: 0,
        address: '',
    }

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            errorStatus: 0,
            error: null,
            formIsValid: false,
            formControls: {
                name: {
                    value: '',
                    placeholder: 'What is your name?',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        //nameValidator: true
                    }
                },
                email: {
                    value: '',
                    placeholder: 'Email',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        //emailValidator: true
                    }
                },
                age: {
                    value: '',
                    placeholder: 'Age',
                    valid: false,
                    touched: false,
                    validationRules: {
                        //ageValidator: [18, 120],
                        minLength: 1,
                        isRequired: true
                    }
                },
                address: {
                    value: '',
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        const updatedControls = this.state.formControls;
        const updatedFormElement = updatedControls[name];

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


    //Trebuie cred!!!
    componentDidMount()
    {
        //Aici gol:
        //console.log("Nume: " + this.clientCurent.name + " ,Email: " + this.clientCurent.email +
        //    ",Age: " + this.clientCurent.age + " ,Address: " + this.clientCurent.address);

        this.getClientData();

        //console.log("Nume: " + this.clientCurent.name + " ,Email: " + this.clientCurent.email +
        //    ",Age: " + this.clientCurent.age + " ,Address: " + this.clientCurent.address);
    }


    getClientData() {
       return API_CLIENT.getClientData((result, status, error) => {
           if (result !== null && (status === 200 || status === 201)) {

               console.log("Successfully got client!");

               //Folosire result:
               //client = result;
               //Vad daca merge asa:
               //this.clientCurent = result;
               this.clientCurent.name = result.name;
               this.clientCurent.email = result.email;
               this.clientCurent.age = result.age;
               this.clientCurent.address = result.address;

               console.log("Nume: " + this.clientCurent.name + " ,Email: " + this.clientCurent.email +
               ",Age: " + this.clientCurent.age + " ,Address: " + this.clientCurent.address);

               this.reloadHandler();
           } else {
               this.setState(({
                   errorStatus: status,
                   error: error
               }));
           }
       });
    }

    handleSubmit() {
        let client = {
            name: this.state.formControls.name.value,
            email: this.state.formControls.email.value,
            age: this.state.formControls.age.value,
            address: this.state.formControls.address.value,
            //password: this.state.formControls.password.value,
            //role: this.state.formControls.role.value
        };

        console.log(client);
        //this.registerUser(client);
    }

    render() {
        return (
            <div>
                <FormGroup id='name' style = {{backgroundColor: "#549be2"}}>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField'
                           // placeholder={this.state.formControls.name.placeholder} //Pentru a afisa datele!
                           placeholder={this.clientCurent.name}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           disabled
                    />
                    {/*{this.state.formControls.name.touched && !this.state.formControls.name.valid &&*/}
                    {/*<div className={"error-message row"}> * Name is not valid! </div>}*/}
                </FormGroup>

                <FormGroup id='email' style = {{backgroundColor: "#549be2"}}>
                    <Label for='emailField'> Email: </Label>
                    <Input name='email' id='emailField'
                           // placeholder={this.state.formControls.email.placeholder}
                           placeholder={this.clientCurent.email}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.email.value}
                           touched={this.state.formControls.email.touched? 1 : 0}
                           valid={this.state.formControls.email.valid}
                           disabled
                    />
                    {/*{this.state.formControls.email.touched && !this.state.formControls.email.valid &&*/}
                    {/*<div className={"error-message"}> * Email must have a valid format! </div>}*/}
                </FormGroup>

                <FormGroup id='address' style = {{backgroundColor: "#549be2"}}>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField'
                           // placeholder={this.state.formControls.address.placeholder}
                           placeholder={this.clientCurent.address}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           disabled
                    />
                    {/*{this.state.formControls.address.touched && !this.state.formControls.address.valid &&*/}
                    {/*    <div className={"error-message"}> * Address must be valid! </div>}*/}
                </FormGroup>

                <FormGroup id='age' style = {{backgroundColor: "#549be2"}}>
                    <Label for='ageField'> Age: </Label>
                    <Input name='age' id='ageField'
                           // placeholder={this.state.formControls.age.placeholder}
                           placeholder={this.clientCurent.age}
                           // min={0} max={100} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.age.value}
                           touched={this.state.formControls.age.touched? 1 : 0}
                           valid={this.state.formControls.age.valid}
                           disabled
                    />
                    {/*{this.state.formControls.age.touched && !this.state.formControls.age.valid &&*/}
                    {/*    <div className={"error-message"}> * Age must be correct! </div>}*/}
                </FormGroup>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default ClientFormDescription;








