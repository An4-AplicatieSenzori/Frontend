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
import ClientChatBox from "./components/client-chatBox";
import ClientChart from "./components/client-chart";
import ClientWebSocket from "./components/client-websocket"
import ClientDescription from "./components/client-description";
import * as API_CLIENT from "./api/client-api"
import ClientTable from "./components/client-table";
import * as API_USERS from "../user/api/user-api";
import { withRouter } from "react-router-dom";
import UserFormInsert from "../user/components/user-form-insert";
import ClientFormDescription from "./components/client-description";
import UserCookie from "../userCookie";



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

//Merge in functii asa:
/*let params = {
    id: null,
}*/

class ClientContainer extends React.Component
{
    userName = "noName";
    // params = {
    //     id: null,
    // }

    //TREBUIE INAFARA CLASEI!!!

    //Global sau State;
    //Params nu in state, in afara;
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleFormChart = this.toggleFormChart.bind(this);
        this.reload = this.reload.bind(this);
        this.reloadDescription = this.reloadDescription.bind(this);
        this.reloadChart = this.reloadChart.bind(this);
        // this.reloadChatBox = this.reloadChatBox.bind(this);

        this.state = {
            selected: false,
            selectedChart: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
        };
        //this.params = {
        //    id: null,
        //}

        this.cookieRef = React.createRef();
    }

    //Cum faci in ordine?
    //Pentru date din backend:
    //Requesturi concurente:
    componentDidMount() {
        //this.redirectToHome();
        this.fetchUserRole();
        //Nu apelez aici concurent, ci pun sa fie in alta functie!!!
        //Complicat:
        //this.fetchUserId();
        this.fetchUserName();
        this.fetchClientDevices(this.cookieRef.current.state.id); //(this.params);
    }


    //return API_CLIENT.getUserRole((result, status, err) => {
    //return((result = this.cookieRef.current.state.role) => {
    fetchUserRole()
    {
        //let result = this.cookieRef.current.state.role;

        let result = this.cookieRef.current.state.role;
        //let result = this.cookieRef.current.props.cookies.get("role");

        console.log("Testul 1: " + result);
        console.log("Testul 2: " + this.cookieRef.current.state.address);
        if (result !== null) { //&& status === 200) {
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
        //else {
        //this.setState(({
        //    errorStatus: status,
        //    error: err
        //}));
        //}
        //});
    }



    //Pentru admin, trebuie alta functie pentru client:
    //fetchDevices() {
    //Trebuie dat si aici un id:
    //Params = Parametrii transmisi catre backend prin api;
    //Callback = Ce returneaza, result, status si daca exista eroare;
    //Reload la tabel;
    fetchClientDevices(userId) //(params)
    {
        //Ar trebui sa fie ordinea buna si sa nu mai puna null acum!!!
        //NU MERGE ORDINEA!!!
        //this.fetchUserId();

        //Setare params cu id al userului:
        //Il setam defapt in alt get;
        //De ce se sterge?
        //console.log("User id in params: " + this.params.id);

        //Da eroare daca nu avem id, trebuie sa fie number;
        console.log("Testul 4: " + userId);

        if(userId !== "noId")
        {
            //return API_CLIENT.getClientDevices(this.params,(result, status, err) => {
            return API_CLIENT.getClientDevices(userId, (result, status, err) =>
            {
                if (result !== null && status === 200) {

                    //Aici putem folosi lista de result, sau ce se primeste;
                    //Trebuie trimisa lista, altfel nu putem afisa tabelul;
                    //Nici o validare la tabel;

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
    }



    //Nu dam params, trebuie doar luat id si setat;
    /*
    fetchUserId() {
        return API_CLIENT.getUserId((result, status, err) => {
            if (result !== null && status === 200) {
                //Selectat params id: Un String! Char! Idk!
                //this.params.id = result;
                //Nu este din clasa, din afara acel let!!!

                //Ia result bine:
                console.log("User id fetch: " + result);
                this.params.id = result; //This neaparat?
            }
            else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }
    */



    //Result:
    fetchUserName() {
        //return API_CLIENT.getUserName((result, status, err) => {
        //return((result = this.cookieRef.current.state.name) => {

        let result = this.cookieRef.current.state.name;
        //let result = this.cookieRef.current.props.cookies.get("name");
        console.log("Testul 3: " + result);
        if (result !== null) { //&& status === 200) {
            //Dam numele mai departe;
            this.userName = result; //Recunoaste cu this;
            //this.userName = "Altceva";
        }
        else {
            //this.setState(({
            //    errorStatus: status,
            //    error: err
            //}));
        }
        //});
    }

    //Pentru form:
    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    toggleFormChart() {
        this.setState({selectedChart: !this.state.selectedChart});
    }

    //redirectToHome() {
        //To home:
        //De ce nu am acces la history aici dar am in celelalte parti?
        //let newPath = '/';
        //this.props.history.push(newPath);
        //return this.props.history.push(newPath);
    //}

    //Si aici:
    //Back la pagina anterioara;
    //Se apeleaza constant;
    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchUserRole();
        this.fetchUserName();
        this.fetchClientDevices(this.cookieRef.current.state.id);
        //this.redirectToHome();
    }

    //La fel ca mai sus:
    //Ca si la reloadul normal!
    reloadChart(){
        this.setState({
            isLoaded: false
        });

        //Nu trebuie reload, trimit gol:
        //Nu cred ca trebuie aici!!!
        //this.toggleFormChart();
        this.fetchUserRole();
        this.fetchUserName();
        this.fetchClientDevices(this.cookieRef.current.state.id);
    }

    reloadDescription(){
        this.setState({
            isLoaded: false
        });
        //this.toggleFormDescription();
        this.fetchUserRole();
        this.fetchUserName();
        this.fetchClientDevices(this.cookieRef.current.state.id);
    }

    //Trebuie?
    // reloadChatBox(){
    //     this.setState({
    //         isLoaded: false
    //     });
    //     this.fetchUserRole();
    //     this.fetchUserName();
    //     this.fetchClientDevices(this.cookieRef.current.state.id);
    // }

    render() {
        return (
            <div style={divTotal}>

                <UserCookie ref={this.cookieRef} />

                <CardHeader style={managementTitle}>
                    <strong> Hello {this.userName}! These are your devices: </strong>
                </CardHeader>

                <Card>

                    <br/>

                    {/*Descrierea persoanei:*/}
                    {/*reloadHandler={this.reloadDescription}*/}
                    <Row>
                        <Col sm={{size: '5', offset: '2'}}>
                            <ClientFormDescription reloadHandler={this.reloadDescription}/>
                        </Col>
                    </Row>

                    <br/>

                    <Row>
                        {/*Table foloseste get!*/}
                        <Col sm={{size: '8', offset: '2'}}>
                            {this.state.isLoaded && <ClientTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>

                    <br/>
                    <br/>

                    {/*Aranjez una langa cealalta:*/}
                    {/*style = {{display: inline-block} }*/}
                    <div>
                        <ClientWebSocket/>
                        <ClientChatBox/>
                    </div>

                    <br/>
                    <br/>

                    {/*Este putin mai mic butonul!*/}
                    {/*style = {{marginLeft: "9.5%"}}*/}
                    {/*sm={{size: '8', offset: '2'}}*/}
                    <Row>
                        <Col>
                            <Button color="primary"
                                    onClick={this.toggleFormChart}
                                    style = {buttonStyle}>
                                See Chart Device</Button>
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

                {/*Aici am pus chart, nu sunt multe de lucrat aici, este doar o modala:*/}
                <Modal isOpen={this.state.selectedChart} toggle={this.toggleFormChart}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormChart}
                                 style = {{backgroundColor: "#549be2"}}>Device Chart:</ModalHeader>
                    <ModalBody style = {{backgroundColor: "#549be2"}}>
                        {/*Nu mai trebuie handler, nu trebuie facut nimic cu datele din spate ca inainte!!!*/}
                        {/*reloadHandler={this.reloadChart}*/}
                        <ClientChart/>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

//Si pentru back redirect este prop history!
export default withRouter(ClientContainer);

/*

<ClientWebSocket>
                    </ClientWebSocket>

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



