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
import UserFormInsert from "./components/user-form-insert";
import UserFormUpdate from "./components/user-form-update";
import UserFormDelete from "./components/user-form-delete";
import * as API_USERS from "./api/user-api" //Pagina API;
import UserTable from "./components/user-table";
import { withRouter } from "react-router-dom";
import UserCookie from "../userCookie";
import BackgroundImgAdmin from "../commons/images/adminBackground4.jpg"; //4.jpg"; //3.jpg"; //2.jpg"; //1.png";



const managementTitle = {
    textAlign: 'center',
    paddingTop: '2%',
    paddingBottom: '2%',
    backgroundColor: '#549be2',
};

const backgroundStyleAdmin = {
    overflow: 'hidden',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    // height: "3840px",
    backgroundImage: `url(${BackgroundImgAdmin})`
};

// const divTotal = {
//     overflow: 'hidden',
// };

//Clasa container: Containerul contine tabelul?
//Functii din React Component: toggleForm / reload / render...;
class UserContainer extends React.Component
{
    //userName = 'noName';

    //Constructor:
    constructor(props) {
        super(props);
        this.toggleFormInsert = this.toggleFormInsert.bind(this);
        this.toggleFormUpdate = this.toggleFormUpdate.bind(this);
        this.toggleFormDelete = this.toggleFormDelete.bind(this);
        this.reloadInsert = this.reloadInsert.bind(this);
        this.reloadUpdate = this.reloadUpdate.bind(this);
        this.reloadDelete = this.reloadDelete.bind(this);
        this.state = {
            selectedInsert: false,
            selectedUpdate: false,
            selectedDelete: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };

        this.cookieRef = React.createRef();
    }

    //? Face toate geturile, fetchurile, nu stiu daca se fac in ordine;
    //Asta este doar pentru ce sa apara la INCEPUT pe pagina;
    //Form in modala de exemplu este la buton!!!
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
        //return API_USERS.getUserRole((result, status, err) => {
        //return((result = this.cookieRef.current.state.role) => {

        let result = this.cookieRef.current.state.role;
        //let result = this.cookieRef.current.props.cookies.get("role");
        if (result !== null) { //&& status === 200) {

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
                //Daca faci ceva, te duce la admin!
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
            //this.setState(({
            //    errorStatus: status,
            //    error: err
            //}));
        }
        //});
    }


    //? Deschide orice form, in modala;
    toggleFormInsert() {
        this.setState({selectedInsert: !this.state.selectedInsert});
    }

    toggleFormUpdate() {
        this.setState({selectedUpdate: !this.state.selectedUpdate});
    }

    toggleFormDelete() {
        this.setState({selectedDelete: !this.state.selectedDelete});
    }

    //Oare trebuie is loaded de 3 ori?
    //? Toate una dupa alta, parca pipeline de grafica;
    reloadInsert() {
        this.setState({
            isLoaded: false //Nu are legatura cu modala!
        });
        this.toggleFormInsert();
        //this.toggleFormUpdate();
        //this.toggleFormDelete();
        this.fetchUserRole();
        this.fetchUsers();
    }

    reloadUpdate() {
        this.setState({
            isLoaded: false
        });
        this.toggleFormUpdate();
        this.fetchUserRole();
        this.fetchUsers();
    }

    reloadDelete() {
        this.setState({
            isLoaded: false
        });
        this.toggleFormDelete();
        this.fetchUserRole();
        this.fetchUsers();
    }




    //TOATA PAGINA DE USER!!! (+NavBar!)
    //Return la div:
    render() {
        return (
            // <div style={backgroundStyleAdmin}>
            <div>
                <CardHeader style={managementTitle}>
                    <strong> User Management </strong>
                </CardHeader>

                <Card style={backgroundStyleAdmin}>
                    <br/>

                    <Row style = {{marginLeft: "9.5%"}}>
                        <Col sm={{size: '0', offset: '1'}}>
                            <Button color="primary" onClick={this.toggleFormInsert}>Add User</Button>
                        </Col>

                        <Col sm={{size: '0', offset: '1'}}>
                            <Button color="primary" onClick={this.toggleFormUpdate}>Update User</Button>
                        </Col>

                        <Col sm={{size: '0', offset: '1'}}>
                            <Button color="primary" onClick={this.toggleFormDelete}>Delete User</Button>
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

                <Modal isOpen={this.state.selectedInsert} toggle={this.toggleFormInsert}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormInsert}
                                 style = {{backgroundColor: "#549be2"}}> Add User:</ModalHeader>
                    <ModalBody style = {{backgroundColor: "#549be2"}}>
                        <UserFormInsert reloadHandler={this.reloadInsert}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleFormUpdate}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdate}
                                 style = {{backgroundColor: "#549be2"}}> Update User:</ModalHeader>
                    <ModalBody style = {{backgroundColor: "#549be2"}}>
                        <UserFormUpdate reloadHandler={this.reloadUpdate}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedDelete} toggle={this.toggleFormDelete}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormDelete}
                                 style = {{backgroundColor: "#549be2"}}> Delete User:</ModalHeader>
                    <ModalBody style = {{backgroundColor: "#549be2"}}>
                        <UserFormDelete reloadHandler={this.reloadDelete}/>
                    </ModalBody>
                </Modal>

                <UserCookie ref={this.cookieRef} />

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









