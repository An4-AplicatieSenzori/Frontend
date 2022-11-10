//Importuri: Erori Cards? Cred! Nu stiu de ce atatea!
import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import UserForm from "./components/user-form";
import * as API_USERS from "./api/user-api" //Pagina API;
import UserTable from "./components/user-table";
import { withRouter } from "react-router-dom";



const managementTitle = {
    textAlign: 'center',
    paddingTop: '2%',
    paddingBottom: '2%',
    backgroundColor: '#549be2',
};

const divTotal = {
    overflow: 'hidden',
};

//Clasa container: Containerul contine tabelul?
//Functii din React Component: toggleForm / reload / render...;
class UserContainer extends React.Component
{
    //Constructor:
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    //? Face toate geturile, fetchurile, nu stiu daca se fac in ordine;
    componentDidMount() {
        //Cate fetchuri doresti;
        //Se fac in ordine? Pun redirect first just in case, sa nu proceseze
        //alte geturi in schimb;
        //Doar 3 locuri pentru redirect, Home, Client, Admin;
        this.fetchUserRole();
        this.fetchUsers();
    }


    componentWillUnmount() {
        //fix Warning: Can't perform a React state update on an unmounted component:
        this.setState = (state,callback)=>{
            return;
        };
    }


    //Posturile se fac in Forms, pentru ca introduci date;
    //Geturile se fac in container, pentru ca nu ai nevoie de date;
    //(Le poti face direct aici)
    //Ia datele;
    fetchUsers() {
        return API_USERS.getUsers((result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }


    fetchUserRole() {
        return API_USERS.getUserRole((result, status, err) => {
            if (result !== null && status === 200) {

                //Redirect daca nu avem "admin" ca role, redirect la HOME!
                //Delogare daca incerci sa accesezi pagina care nu iti corespunde;
                //Asa este mai usor, mergem pe home;

                //Cand nu ai role, sau est client, nu te va duce la admin;
                if(result === "noRole")
                {
                    //Back to Home;
                    let newPath = '/';
                    this.props.history.push(newPath);
                }
                else if(result === "admin")
                {
                    //Nothing! Nu trebuie facut nimic!
                    //let newPath = '/admin';
                    //this.props.history.push(newPath);
                }
                else if(result === "client")
                {
                    //Tot la user ar trebui redirectat:
                    //Redirectare la pagina de client;
                    let newPath = '/client';
                    this.props.history.push(newPath);
                }
            }
             else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }


    //?
    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    //? Toate una dupa alta, parca pipeline de grafica;
    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchUserRole();
        this.fetchUsers();
    }



    //TOATA PAGINA DE USER!!! (+NavBar!)
    //Return la div:
    render() {
        return (
            <div style={divTotal}>
                <CardHeader style={managementTitle}>
                    <strong> User Management </strong>
                </CardHeader>

                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: '2'}}>
                            <Button color="primary" onClick={this.toggleForm}>Add User</Button>
                        </Col>
                    </Row>
                    <br/>

                    <Row>
                        <Col sm={{size: '8', offset: '2'}}>
                            {this.state.isLoaded && <UserTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}
                                 style = {{backgroundColor: "#549be2"}}> Add User:</ModalHeader>
                    <ModalBody style = {{backgroundColor: "#549be2"}}>
                        <UserForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}



//Export final:
//PERSON FORM APARE IN MODALA!!!
//style = {{backgroundColor: 'white'}}
export default withRouter(UserContainer);

/*
<Col sm={{size: '8', offset: 1}}>

<!-- Aici este modala, ascunsa, inafara de atunci cand ne trebuie pentru adaugat persoane;
                 Merge ca un pop up de completat in fata paginii, ca la practica;-->
                <!-- Toggle la modala, sau la alte componente -->
                <!-- Aici avem toata pagina persons! -->
                <!-- Nu stiu de ce cards! Titlul: -->
                <!-- Aici este tot tabelul: -->
                <!-- Aici este butonul de add: -->
*/









