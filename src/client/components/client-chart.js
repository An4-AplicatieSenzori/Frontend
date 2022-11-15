import React from 'react';
import validate from "./validators/client-validators"; //Acum chiar il folosesc!
import Button from "react-bootstrap/Button";
import * as API_CLIENT from "../api/client-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
//Pentru DATE si pentru CHART:
import DatePicker from 'react-date-picker';
import Chart from 'react-apexcharts'

class ClientChart extends React.Component {

    //Pentru Chart:
    dataChart = {
        options: {
            //Titlu:
            chart: {
                id: 'Energy Chart'
            },
            xaxis: {
                categories: []
            }
        },
        series: [{
            name: 'series-1',
            data: []
        }]
    }

    //Pentru date picker:
    //const [value, setValue] = useState(new Date());

    constructor(props) {
        super(props);
        //Ramane toggle + reload:
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        //Unique title pentru gasire a face device:
        //Sa aiba 36 de caractere!
        this.state = {
            startDate: new Date(), //Asa ia data curenta!!!
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
            }
        };

        //Change + Submit:
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeChart = this.handleChangeChart.bind(this);
    }

    //La fel:
    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    //Pentru inputs:
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


    handleSubmit() {
        let device = {
            title: this.state.formControls.title.value,
        };

        console.log(device);
        //this.registerUser(device);
    }

    // onChange = (e, e2) => {
    //     this.state(state => ({...state, miDate: e.target.value}));
    //     if (e2 == null && e != null) {
    //         this.setState({ [e.target.name]: e.target.value });
    //     } else if (e2 === null && e === null) {
    //         this.setState({ ...this.state, "days": [null]});
    //     } else {
    //         this.setState({ ...this.state, "days": [e] });
    //     }
    // }

    handleChangeChart(date) {
        this.setState({
            startDate: date //Care este acest date? Cel nou? Nu cel initial;
        })
    }

    render() {
        return (
            <div>
                <FormGroup id='title' style = {{backgroundColor: "#549be2"}}>
                    <Label for='titleField'> Name: </Label>
                    <Input name='title' id='titleField' placeholder={this.state.formControls.title.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.title.value}
                           touched={this.state.formControls.title.touched? 1 : 0}
                           valid={this.state.formControls.title.valid}
                           required
                    />
                    {/*Valid pentru validare!*/}
                    {this.state.formControls.title.touched && !this.state.formControls.title.valid &&
                    <div className={"error-message row"}> * Title is not valid! </div>}
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 5}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}
                                style = {{backgroundColor: '#ab1111'}}>  Submit
                        </Button>
                    </Col>
                </Row>

                <br/>

                {/*Set value pentru value:*/}
                {/*Value este atribut la tag*/}
                <DatePicker
                            // value={this.state.value}
                            // onChange={
                            // () => this.setState(this.state.value.setValue())} format={"yyyy-MM-dd"}/>
                            // () => this.setState(this.state.value.setValue())} format={"yyyy-MM-dd"}/>
                            value = { this.state.startDate }
                            onChange = { this.handleChangeChart }
                            name = "startDate"
                            format = {"yyyy-MM-dd"}
                            />
                <br/>
                <br/>

                {/*Pentru Chart:*/}
                <Row>
                    <Chart options={this.dataChart.options}
                           series={this.dataChart.series} type="bar" width={500} height={320} />
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default ClientChart;









