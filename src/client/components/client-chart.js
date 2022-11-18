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


//Si metode POST, si metode GET, depinde
//ce vrem sa luam si sa dam;\
//Deci un FORM cu GET, vad cum merge;
class ClientChart extends React.Component {

    //Pentru Chart: !!!
    //Limita 5, poate daca adaugi devine mai mare;
    //CATEGORIES AND SERIES SUNT LISTE!!!
    dataChart = {
        options: {
            //Titlu:
            chart: {
                id: 'Energy Chart'
            },
            xaxis: {
                //Aici poti pune orice: (CA SI TIP!!!)
                //O lista de ORE (De la 00:00 pana la 23:00)
                //Asta se reprezinta pe X axis;
                categories: []
            }
        },
        series: [{
            name: 'series-1',
            //Pentru valorile de pe Y!
            //Pui valorile anume;
            //Dai o lista, se pune automat intre valorile min si max;
            //Sunt valori intre min pus, sa zicem 0-10 si maxim, sa zicem 100-1000;
            data: []
        }]
    }

    //Pentru date picker:
    //const [value, setValue] = useState(new Date());

    constructor(props) {
        super(props);
        //Ramane toggle + reload:
        this.toggleForm = this.toggleForm.bind(this);
        //Este deja:
        this.reloadHandler = this.props.reloadHandler;

        //Unique title pentru gasire a face device:
        //Sa aiba 36 de caractere!
        this.state = {
            //Pentru date picker: Ziua actuala:
            startDate: new Date(), //Asa ia data curenta!!!
            errorStatus: 0,
            error: null,
            formIsValid: false,
            formControls: {
                title: {
                    value: '', //Aici este string, daca nu pot string incerc sa trimit altceva!!!
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



    //Nu trebuie in acest form, doar la handle submit!!!
    /*
    componentDidMount()
    {
        this.getDeviceData(deviceTitle);
    }
    */



    //Handle Submit inainte de GetDevices!!!
    handleSubmit()
    {
        //Titlul deviceului, trimis in backend aici:
        //String
        let device = {
            title: this.state.formControls.title.value,
        };

        //console.log(device);
        //this.getDeviceData(this.device.title); //Nu este in state, not in this!
        this.getDeviceData(device.title); //In title direct, nu mai trebuie accesat alt camp!!!
    }



    handleChangeChart(date) {
        this.setState({
            startDate: date
            //Care este acest date? Cel nou? Nu cel initial;
        })
    }



    //Parametru dat, titlul deviceului:
    //Handle submit pentru cand introduc un title nou:
    getDeviceData(deviceTitle) {
        return API_CLIENT.getDeviceData(deviceTitle, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {

                //Result cu datele deviceului (IN TOATE ZILELE!!! Nu doar 1, filtrare aici):
                console.log("Successfully got device data!");

                //Pentru testare result:
                console.log(result);

                //Device management: (Filter + Order):
                //Da eroare reloadHander;
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
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


    render() {
        return (
            <div>
                <br/>

                <FormGroup id='title' style = {{backgroundColor: "#549be2"}}>
                    <Label for='titleField'> Title: </Label>
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

                <br/>

                {/*In submit ca atunci dai datele la backend!!!*/}
                <Row>
                    <Col sm={{size: '4', offset: 5}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}
                                style = {{backgroundColor: '#ab1111'}}>  Submit
                        </Button>
                    </Col>
                </Row>

                <br/>

                {/*Poate merge text in render, nici nu ii trebe tag?*/}
                {/*Set value pentru value:*/}
                {/*Value este atribut la tag*/}
                {/*Nu merge border pentru DatePicker, POATE mai incerc:*/}
                <DatePicker
                    // style = {{
                    // border: 'solid !impportant',
                    // borderRadius: '5px !impportant',
                    // borderColor: '#000000 !impportant',}}
                            //3px #000000
                            // value={this.state.value}
                            // onChange={
                            // () => this.setState(this.state.value.setValue())} format={"yyyy-MM-dd"}/>
                            // () => this.setState(this.state.value.setValue())} format={"yyyy-MM-dd"}/>

                            //Alegerea din pop up date;
                            //Ce dai initial, si on change se schimba;
                            value = { this.state.startDate }
                            //On change pentru cand vrei noua data; Are sens:
                            onChange = { this.handleChangeChart }
                            // Ca la input: ca si la hover peste componenta:
                            name = "startDate"
                            //Year, Luna, Zi, deci trebuie si ora stocata separat;
                            format = {"yyyy-MM-dd"} //Format fara ore;
                            />
                <br/>
                <br/>

                {/*Pentru Chart:*/}
                <Row>
                    <Chart
                           style = {{
                               border: "solid " +
                                   "3px " +
                                   "#072da4",
                               marginLeft: "1.8%"}}
                           //backgroundColor: "#000000"}
                           //Options: Pentru X Axis;
                           options={this.dataChart.options}
                           //Series:  Pentru Y Axis;
                           series={this.dataChart.series}
                           //Un type anue:
                           type="bar" width={400} height={300} />
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}



//Tot chartul:
export default ClientChart;

//Pentru trimiteri in B:
//this.state.startDate;
//si this.device.title;
//SAU filtram aici in functie de startDate
//si atunci se trimite doar title!!!

//Pentru primiri din B:
//this.dataChart.option.xaxis.categories[];
//si this.dataChart.series.data[];







