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
import PersonForm from "./components/person-form";
import * as API_USERS from "./api/person-api"
import PersonTable from "./components/person-table";


//Clasa container: Containerul contine tabelul?
//Functii din React Component: toggleForm / reload / render...;
class PersonContainer extends React.Component {

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

    //?
    componentDidMount() {
        this.fetchPersons();
    }

    //Ia datele;
    fetchPersons() {
        return API_USERS.getPersons((result, status, err) => {
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
        this.fetchPersons();
    }

    //Return la div:
    render() {
        return (
            <div>
                <!-- Aici avem toata pagina persons! -->
                <!-- Nu stiu de ce cards! Titlul: -->
                <CardHeader>
                    <strong> Person Management </strong>
                </CardHeader>

                <!-- Aici este butonul de add: -->
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Person </Button>
                        </Col>
                    </Row>
                    <br/>

                    <!-- Aici este tot tabelul: -->
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <PersonTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>

                <!-- Aici este modala, ascunsa, inafara de atunci cand ne trebuie pentru adaugat persoane;
                 Merge ca un pop up de completat in fata paginii, ca la practica;-->
                <!-- Toggle la modala, sau la alte componente -->
                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Person: </ModalHeader>
                    <ModalBody>
                        <PersonForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

//Export final:
export default PersonContainer;











