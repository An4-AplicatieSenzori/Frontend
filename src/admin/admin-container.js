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
//import AdminForm from "./components/admin-form";
import * as API_ADMIN from "./api/admin-api"
//import AdminTable from "./components/admin-table";
import { withRouter } from "react-router-dom";
import * as API_CLIENT from "../client/api/client-api";


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

class AdminContainer extends React.Component
{
    //User Name Admin!
    //userNameAdmin = "userName"; //''W

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
            error: null,
            userName: "userNameAdmin",
        };
    }

    componentDidMount() {
        //this.redirectToHome();
        this.fetchUserRole();
        this.fetchUserName();
    }

    fetchUserRole() {
        return API_ADMIN.getUserRole((result, status, err) => {
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
                    //let newPath = '/admin';
                    //this.props.history.push(newPath);
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


    fetchUserName() {
        return API_ADMIN.getUserName((result, status, err) => {
            if (result !== null && status === 200) {

                //NU MERGE!!!
                //this.userNameAdmin = result;
                //this.userNameAdmin = "Altceva";

                //MERGE ASTA!!!
                //2 sau 1 paranteza:
                this.setState({
                    userName: result,
                });

            }
            else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }


    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    //Nu merge aici?
    redirectToHome() {
        //To home:
        let newPath = '/';
        //this.props.history.push(newPath);
        //return this.props.history.push(newPath);
    }

    //Si aici:
    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchUserRole();
        this.fetchUserName();
        //this.redirectToHome();
    }

    render() {

        //NU MERGE: onClick={this.redirectToHome}>Back</Button>

        return (
            <div style={divTotal}>
                <CardHeader style={managementTitle}>
                    <strong> Hello {this.state.userName}! Good luck at managing! </strong>
                </CardHeader>

                <Card>
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

export default withRouter(AdminContainer);

/*
 {this.userNameAdmin}
<Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}
                                 style = {{backgroundColor: "#549be2"}}> Add User:</ModalHeader>
                    <ModalBody style = {{backgroundColor: "#549be2"}}>
                        <ClientForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>



<Card>

                    <br/>

                    <Row>
                        <Col sm={{size: '8', offset: '2'}}>
                            {this.state.isLoaded && <AdminTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>


*/



