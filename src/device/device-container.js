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
import DeviceForm from "./components/device-form";
import * as API_DEVICES from "./api/device-api"
import DeviceTable from "./components/device-table";
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

class DeviceContainer extends React.Component
{
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

    componentDidMount() {
        this.fetchUserRole();
        this.fetchDevices();
    }

    fetchDevices() {
        return API_DEVICES.getDevices((result, status, err) => {
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


    //Same function:
    //Toata lumea are acces doar la pagina lui:
    fetchUserRole() {
        return API_DEVICES.getUserRole((result, status, err) => {
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
                    //Asa oricum te duce la pagina aia;
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


    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchUserRole();
        this.fetchDevices();
    }

    render() {
        return (
            <div style={divTotal}>
                <CardHeader style={managementTitle}>
                    <strong> Device Management </strong>
                </CardHeader>

                <Card>
                    <br/>
                    <Row style = {{marginLeft: "9.5%"}}>
                        <Col sm={{size: '0', offset: '1'}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Device</Button>
                        </Col>

                        <Col sm={{size: '0', offset: '1'}}>
                            <Button color="primary" onClick={this.toggleForm}>Update Device</Button>
                        </Col>

                        <Col sm={{size: '0', offset: '1'}}>
                            <Button color="primary" onClick={this.toggleForm}>Delete Device</Button>
                        </Col>
                    </Row>
                    <br/>

                    <Row>
                        <Col sm={{size: '8', offset: '2'}}>
                            {this.state.isLoaded && <DeviceTable tableData = {this.state.tableData}/>}
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
                                 style = {{backgroundColor: "#549be2"}}> Add Device:</ModalHeader>
                    <ModalBody style = {{backgroundColor: "#549be2"}}>
                        <DeviceForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default withRouter(DeviceContainer);











