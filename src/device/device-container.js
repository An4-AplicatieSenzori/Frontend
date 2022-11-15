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
import DeviceFormInsert from "./components/device-form-insert";
import DeviceFormUpdate from "./components/device-form-update";
import DeviceFormDelete from "./components/device-form-delete";
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
        this.toggleFormInsert = this.toggleFormInsert.bind(this);
        this.toggleFormUpdate = this.toggleFormUpdate.bind(this);
        this.toggleFormDelete = this.toggleFormDelete.bind(this);
        this.reloadInsert = this.reloadInsert.bind(this);
        this.reloadDelete = this.reloadDelete.bind(this);
        this.reloadUpdate = this.reloadUpdate.bind(this);
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


    toggleFormInsert() {
        this.setState({selectedInsert: !this.state.selectedInsert});
    }

    toggleFormUpdate() {
        this.setState({selectedUpdate: !this.state.selectedUpdate});
    }

    toggleFormDelete() {
        this.setState({selectedDelete: !this.state.selectedDelete});
    }

    reloadInsert() {
        this.setState({
            isLoaded: false
        });
        this.toggleFormInsert();
        this.fetchUserRole();
        this.fetchDevices();
    }

    reloadUpdate() {
        this.setState({
            isLoaded: false
        });
        this.toggleFormUpdate();
        this.fetchUserRole();
        this.fetchDevices();
    }

    reloadDelete() {
        this.setState({
            isLoaded: false
        });
        this.toggleFormDelete();
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
                            <Button color="primary" onClick={this.toggleFormInsert}>Add Device</Button>
                        </Col>

                        <Col sm={{size: '0', offset: '1'}}>
                            <Button color="primary" onClick={this.toggleFormUpdate}>Update Device</Button>
                        </Col>

                        <Col sm={{size: '0', offset: '1'}}>
                            <Button color="primary" onClick={this.toggleFormDelete}>Delete Device</Button>
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

                <Modal isOpen={this.state.selectedInsert} toggle={this.toggleFormInsert}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormInsert}
                                 style = {{backgroundColor: "#549be2"}}> Add Device:</ModalHeader>
                    <ModalBody style = {{backgroundColor: "#549be2"}}>
                        <DeviceFormInsert reloadHandler={this.reloadInsert}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleFormUpdate}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdate}
                                 style = {{backgroundColor: "#549be2"}}> Update Device:</ModalHeader>
                    <ModalBody style = {{backgroundColor: "#549be2"}}>
                        <DeviceFormUpdate reloadHandler={this.reloadUpdate}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedDelete} toggle={this.toggleFormDelete}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormDelete}
                                 style = {{backgroundColor: "#549be2"}}> Delete Device:</ModalHeader>
                    <ModalBody style = {{backgroundColor: "#549be2"}}>
                        <DeviceFormDelete reloadHandler={this.reloadDelete}/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default withRouter(DeviceContainer);











