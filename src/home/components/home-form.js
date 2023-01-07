import React from 'react';
import validate from "./validators/home-validators";
import Button from "react-bootstrap/Button";
import * as API_HOME from "../api/home-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
//import { useNavigate } from "react-router-dom"; //"^4.3.1", //Varianta 6 mai veche!
import { withRouter } from "react-router-dom";
import UserCookie from "../../userCookie";
//let navigate = useNavigate();

import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";


//Despre nou form:
class HomeForm extends React.Component
{
    //let navigate = useNavigate(); //Variabila din functii;
    //Const nu mai poti modifica dupa;

    /*
    delayRedirect = event => {
        const { history: { push } } = this.props;
        event.preventDefault();
        setTimeout(()=>push(to), 1000);
    }*/

    //static propTypes = {
    //    cookies: instanceOf(Cookies).isRequired
    //};

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        //this.routeChange = this.routeChange.bind(this);
        this.userRoleData = this.userRoleData.bind(this);

        //Ce avem in obj;
        this.state = {
            result: null,
            errorStatus: 0,
            error: null,
            formIsValid: false,
            formControls: {
                name: {
                    value: '',
                    placeholder: 'Login with User Name',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        nameValidator: true
                    }
                },
                password: {
                    value: '',
                    placeholder: '**********',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        passwordValidator: true
                    }
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cookieRef = React.createRef();
    }

    //Se state:
    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    //Verificari pentru change:
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

    //Obiect cu 2 campuri, name and password: (Subobiect de la user)
    //In loc de UUID, trimit role pentru a stii unde sa redirectionez;
    //Restul trebuie String converted!
    userRoleData(homeUser) {
        return API_HOME.userRoleRedirect(homeUser, (result, status, error) => {

            //console.log("Result type: " + typeof result);
            //Primim ROLUL aici, tot ce ne intereseaza; In Backend este stocat userul curent;
            //Am vrea sa avem o metoda de a clasifica userii din frontend, sa avem si id-ul aici;
            //Dupa ce avem id-ul se poate cere userul curent mai usor; Sau schimba in Backend; ()
            if (result !== null && (status === 200 || status === 201)) {
                //Gasim un user cu datele putine date, si returnam id-ul din backend;
                //console.log("The user with id: " + result + " was found!");
                //console.log("The user with role " + result + " was found!")
                this.reloadHandler(); //Mov?



                //Pentru cookie: Direct in cealalta clasa; Fac set de acolo:
                //const { cookies } = this.props;
                // cookies.set("id", result.id, { path: "/" });
                // cookies.set("name", result.name, { path: "/" });
                // cookies.set("address", result.address, { path: "/" });
                // cookies.set("age", result.age, { path: "/" });
                // cookies.set("email", result.email, { path: "/" });
                // cookies.set("password", result.password, { path: "/" });
                // cookies.set("role", result.role, { path: "/" });
                //this.setState({ example: cookies.get("example") });
                //UserCookie.handleUserChange(result);
                //UserCookie.handleUserChange.bind(result);
                //this.setState({result: result});

                //Referinta la metoda: Asa se apeleaza si pune in cookies;
                //this.cookieRef.current.id;
                this.cookieRef.current.handleUserChange(result);


                //Redirect in functie de role!!!
                //Consider ca result este un String!!! Dar nu este?
                //IL VEDE CA STRING AICI!!!
                if(result.role === 'admin') //String(result) //JSON.stringify(result)
                {
                    //Aici se poate da redirect, este fara eroare in acest caz!!!
                    let newPath = '/admin';
                    //navigate(newPath);
                    this.props.history.push(newPath);
                    //setTimeout(1000);
                }
                else if(result.role === 'client')
                {
                    //Aici se poate da redirect, este fara eroare in acest caz!!!
                    let newPath = '/client';
                    //navigate(newPath);
                    this.props.history.push(newPath);
                    //Client is not valid JSON;
                    //setTimeout(1000);
                }
                else if(result.role === 'noRole')
                {
                    //console.log("There is no role!");
                }
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    //CE SE INTAMPLA CAND APESI PE BUTON!!!
    //Creem un obiect, si il trimitem la backend!!!
    handleSubmit()
    {
        //Datele unui login;
        let homeUser = {
            name: this.state.formControls.name.value,
            password: this.state.formControls.password.value
        };

        console.log(homeUser);
        //console.log("Result type: " + typeof callback);

        this.userRoleData(homeUser);
        //Doar 2 din datele userului,
        //in rest il cautam;
    }

    render() {

        //const { cookies } = this.props;
        //const { userId } = cookies.get("id");
        //{userId && <p>Test: {userId}</p>}
        //{const { cookies } = this.props && <p>Test: {cookies.get("id")}</p>}

        return (

            <div>

                <FormGroup id='name' style = {{backgroundColor: "#ffc824"}}>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * User Name is not valid! </div>}
                </FormGroup>



                <FormGroup id='password' style = {{backgroundColor: "#ffc824"}}>
                    <Label for='passwordField'> Password: </Label>
                    <Input type='password' name='password' id='passwordField'
                           placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                        <div className={"error-message"}> * Password must have a valid format!
                        </div>}
                </FormGroup>



                <Row>
                    <Col sm={{size: '4', offset: 5}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}
                                style = {{backgroundColor: '#ab1111'}}>  Confirm
                        </Button>
                    </Col>
                </Row>
                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }

                {/*Nefolosit:*/}
                {/*<UserCookie></UserCookie>*/}
                {/*<UserCookie value={this.state.result}></UserCookie>*/}
                <UserCookie ref={this.cookieRef} />

            </div>
        ) ;
    }
}

//this.HandleSubmit?
//export default HomeForm;
export default withRouter(HomeForm); //withCookies(withRouter(HomeForm));









