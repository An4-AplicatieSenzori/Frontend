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
//import ClientForm from "./components/client-form";
import * as API_CLIENT from "./api/client-api"
import ClientTable from "./components/client-table";
import * as API_USERS from "../user/api/user-api";
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

const buttonStyle = {
    marginLeft: '17%',
    width: '10%',
    height: '100%'
};

class ClientContainer extends React.Component
{
    userName = "noName";

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

    //Pentru date din backend:
    componentDidMount() {
        //this.redirectToHome();
        this.fetchUserRole();
        this.fetchUserName();
        this.fetchDevices();
    }

    fetchDevices() {
        return API_CLIENT.getDevices((result, status, err) => {
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
        return API_CLIENT.getUserRole((result, status, err) => {
            if (result !== null && status === 200) {
                //Home:
                if(result === "noRole")
                {
                    let newPath = '/';
                    this.props.history.push(newPath);
                }
                //Admin:
                else if(result === "admin")
                {
                    let newPath = '/admin';
                    this.props.history.push(newPath);
                }
                //Client:
                else if(result === "client")
                {
                    //Este doar o pagina oricum:
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



    //Result:
    fetchUserName() {
        return API_CLIENT.getUserName((result, status, err) => {
            if (result !== null && status === 200) {
                //Dam numele mai departe;
                this.userName = result; //Recunoaste cu this;
                //this.userName = "Altceva";
            }
            else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    //Pentru form:
    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    redirectToHome() {
        //To home:
        //De ce nu am acces la history aici dar am in celelalte parti?
        let newPath = '/';
        //this.props.history.push(newPath);
        //return this.props.history.push(newPath);
    }

    //Si aici:
    //Back la pagina anterioara;
    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchUserRole();
        this.fetchUserName();
        this.fetchDevices();
        //this.redirectToHome();
    }

    render() {
        return (
            <div style={divTotal}>
                <CardHeader style={managementTitle}>
                    <strong> Hello {this.userName}! These are your devices: </strong>
                </CardHeader>

                <Card>

                    <br/>

                    <Row>
                        <Col sm={{size: '8', offset: '2'}}>
                            {this.state.isLoaded && <ClientTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>

                    <br/>

                    <Row>
                        <Col>
                            <Button color="primary"
                                    style = {buttonStyle}
                                    onClick={()=>{
                                        let newPath = '/';
                                        this.props.history.push(newPath);
                                    }}>Back</Button>
                        </Col>
                    </Row>

                    <br/>

                </Card>
            </div>
        )
    }
}

//Si pentru back redirect este prop history!
export default withRouter(ClientContainer);

/*

Sunt functii care nu dau returnm void, care seteaza lucruri;
Sunt functii care dau return, si schimba flow;

props.history.push('/')

<Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}
                                 style = {{backgroundColor: "#549be2"}}> Add User:</ModalHeader>
                    <ModalBody style = {{backgroundColor: "#549be2"}}>
                        <ClientForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

*/



