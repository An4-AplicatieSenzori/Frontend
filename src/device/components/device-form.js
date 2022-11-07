import React from 'react';
import validate from "./validators/device-validators";
import Button from "react-bootstrap/Button";
import * as API_DEVICES from "../api/device-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';

class DeviceForm extends React.Component
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
                description: {
                    value: '',
                    placeholder: 'Device Description',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
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
                hourlyConsumption: {
                    value: '',
                    placeholder: '2312.54',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        hourlyConsumptionValidator: true
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
        //const title = event.target.title;
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

    registerDevice(device) {
        return API_DEVICES.postDevice(device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted device with id: " + result + " !");
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
            description: this.state.formControls.description.value,
            address: this.state.formControls.address.value,
            hourlyConsumption: this.state.formControls.hourlyConsumption.value
        };

        console.log(device);
        this.registerDevice(device);
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

                <FormGroup id='description' style = {{backgroundColor: "#549be2"}}>
                    <Label for='descriptionField'> Description: </Label>
                    <Input name='description' id='descriptionField' placeholder={this.state.formControls.description.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.description.value}
                           touched={this.state.formControls.description.touched? 1 : 0}
                           valid={this.state.formControls.description.valid}
                           required
                    />
                    {this.state.formControls.description.touched && !this.state.formControls.description.valid &&
                    <div className={"error-message"}> * Description must be valid! </div>}
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
                    {this.state.formControls.address.touched && !this.state.formControls.address.valid &&
                        <div className={"error-message row"}> * Address must be valid! </div>}
                </FormGroup>

                <FormGroup id='hourlyConsumption' style = {{backgroundColor: "#549be2"}}>
                    <Label for='hourlyConsumptionField'> Hourly Consumption: </Label>
                    <Input name='hourlyConsumption' id='hourlyConsumptionField' placeholder={this.state.formControls.hourlyConsumption.placeholder}
                           min={0} max={10000} type="number" step="0.1"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.hourlyConsumption.value}
                           touched={this.state.formControls.hourlyConsumption.touched? 1 : 0}
                           valid={this.state.formControls.hourlyConsumption.valid}
                           required
                    />
                    {this.state.formControls.hourlyConsumption.touched && !this.state.formControls.hourlyConsumption.valid &&
                        <div className={"error-message row"}> * You must enter correct values! </div>}
                </FormGroup>

                    <Row>
                        <Col sm={{size: '4', offset: 5}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}
                            style = {{backgroundColor: '#ab1111'}}>  Submit </Button>
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

export default DeviceForm;
//type = "number" = int;
//type = "number" = float;
//(mai trebuie si step = "0.1"!)










