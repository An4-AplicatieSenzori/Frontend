import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import BackgroundImg from '../commons/images/energy.jpeg'; //???

import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Container,
    Jumbotron
} from 'reactstrap';
import HomeForm from "./components/home-form";
import * as API_HOME from "./api/home-api"
//import * as API_USERS from "../user/api/user-api";
//import HomeTable from "./components/home-table";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "3840px",
    backgroundImage: `url(${BackgroundImg})`
};

const textStyle =
    {color: 'white',
        textAlign: 'center',
        paddingBottom: '5%'
    };

const divTotal = {
    overflow: 'hidden',
};

const buttonStyle = {
    marginLeft: '40%',
    //padding: '1% 4.5% 1% 4.5%',
    width: '20%',
    height: '100%'
};

class HomeContainer extends React.Component
{
    /*delayRedirect = event => {
        const { history: { push } } = this.props;
        event.preventDefault();
        setTimeout(()=>push(to), 1000);
    }*/

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

    //Pentru gets:
    componentDidMount() {
        this.fetchNoRole();
        //this.fetchClients();
    }

    componentWillUnmount() {
        //fix Warning: Can't perform a React state update on an unmounted component:
        this.setState = (state,callback)=>{
            return;
        };
    }

    fetchNoRole() {
        return API_HOME.getNoRole((result, status, err) => {
            if (result !== null && status === 200) {
                //Nu se face nimic la niciuna:
                if(result === "noRole")
                {
                }
                else if(result === "admin")
                {
                }
                else if(result === "client")
                {
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

    //? Pentru afisare?
    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    //Toggle + Fetch;
    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        //this.fetchNoRole(); //FARA RELOAD!!!
        //this.fetchClients();
    }


    render() {
        return (
            <div style={divTotal}>

                <Jumbotron fluid style={backgroundStyle}>

                    <Container fluid>

                        <h1 className="display-3" style={{textAlign: 'center',
                            color: '#000000', marginBottom: '5%'}}>Energy monitoring platform</h1>

                        <p className="lead" style={textStyle}> <b>
                            Renowned for our expertise in the field of precision measurement in high-current applications,
                            EnergyConsumptionMeasuringCompany has been a leading global provider of advanced measuring systems for many years.
                            Marketed under the ISA® brand, our precision measuring systems offer exceptionally high performance.
                            Our commitment to achieving the ultimate in precision is combined with ease of use and a
                            high degree of variability! </b>
                        </p>

                        <Row>
                            <Col>
                                <Button color="primary"
                                        style = {buttonStyle}
                                        onClick={this.toggleForm}>Login</Button>
                            </Col>
                        </Row>

                    </Container>

                </Jumbotron>

                <br/>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}
                                 style = {{backgroundColor: "#ffc824"}}> Login Form: </ModalHeader>
                    <ModalBody style = {{backgroundColor: "#ffc824"}}>
                        <HomeForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

//Toggle pentru modala, cred ca de acolo se ia?
//sm={{size: '20', offset: '5', width: '50%', height: '50%'}}
//Probabil poti doar un div sa returnezi ca si Render!
export default HomeContainer;
//Nu dai redirect daca esti pe home,
//IN LOC DE REDIRECT DAI DELOGARE!
//export default Home;
//Incurca reload la redirect!





