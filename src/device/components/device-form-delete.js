import React from 'react';
import validate from "./validators/device-validators";
import Button from "react-bootstrap/Button";
import * as API_DEVICES from "../api/device-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';

class DeviceFormDelete extends React.Component
{
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            errorStatus: 0,
            error: null,
            formIsValid: false,
            formControls: {
                title: {
                    value: '',
                    placeholder: 'What is the device?',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        titleValidator: true
                    }
                },
                // userName: {
                //     value: '',
                //     placeholder: 'User Name',
                //     valid: false,
                //     touched: false,
                // },
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

    //Corect, mai trebuie doar luat si clientul;
    deleteDevice(device) {
        return API_DEVICES.deleteDevice(device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully deleted device with id: " + result + " !");
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
        let device = {
            title: this.state.formControls.title.value,
            //userName: this.state.formControls.userName.value,
        };

        console.log(device);
        this.deleteDevice(device);
    }

    render() {
        return (
            <div>
                <FormGroup id='title' style = {{backgroundColor: "#549be2"}}>
                    <Label for='titleField'> Title: </Label>
                    <Input name='title' id='titleField' placeholder={this.state.formControls.title.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.title.value}
                           touched={this.state.formControls.title.touched? 1 : 0}
                           valid={this.state.formControls.title.valid}
                           required
                    />
                    {this.state.formControls.title.touched && !this.state.formControls.title.valid &&
                    <div className={"error-message row"}> * Title must follow the structure! </div>}
                </FormGroup>

                {/*<FormGroup id='userName' style = {{backgroundColor: "#549be2"}}>*/}
                {/*    <Label for='userName'> User Name: </Label>*/}
                {/*    <Input name='userName' id='userName' placeholder={this.state.formControls.userName.placeholder}*/}
                {/*           onChange={this.handleChange}*/}
                {/*           defaultValue={this.state.formControls.userName.value}*/}
                {/*           touched={this.state.formControls.userName.touched? 1 : 0}*/}
                {/*           valid={this.state.formControls.userName.valid}*/}
                {/*    />*/}
                {/*</FormGroup>*/}

                    <Row>
                        <Col sm={{size: '4', offset: 5}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}
                            style = {{backgroundColor: '#ab1111'}}> Delete </Button>
                        </Col>
                    </Row>
                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default DeviceFormDelete;
//type = "number" = int;
//type = "number" = float;
//(mai trebuie si step = "0.1"!)










