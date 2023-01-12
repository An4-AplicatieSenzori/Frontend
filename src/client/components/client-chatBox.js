import React from 'react';
import * as API_CLIENT from "../api/client-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import { FormGroup, Input, Label} from 'reactstrap';
import UserCookie from "../../userCookie";
import SockJsClient from "react-stomp";
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
import {HOST} from '../../commons/hosts';
import * as API_USERS from "../../user/api/user-api";
import validate from "../../user/components/validators/user-validators";


//Tot ce este diferit C-A fata de A-C este ca se trimite si unde vrei sa ajungi, altceva nu cred;
// const SOCKET_URL = HOST.backend_api + '/webSocketMessage';
const SOCKET_URL = HOST.backend_api + '/webSocketMessageClient';



const chatBox = {
    // marginLeft: '17%',
    border: '8px solid red',
    borderRadius: '3%',
    //width: '25%',
    width: '30%',
    height: '100%',
    float: 'left',
    marginLeft: "3%",
    overflow: "hidden",
    backgroundColor: '#549be2'
};

const messageLabel = {
    borderRadius: '10%',
    padding: "3% 3% 3% 3%",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    textAlign: "center",
    // fontsize: "bold",
    fontSize: "large",
};

const messageOutput = {
    border: '2px solid black',
    backgroundColor: "#1a38e0",
    // padding: "3% 3% 3% 3%",
    width: "90%",
    marginLeft: "5%",
    // marginRight: "5%",
    overflowY: "scroll",
    minHeight: "40vh", //"60%", Nu merge procente;
    maxHeight: "40vh", //"90%",
};

const messageInput = {
    border: '2px solid black',
    padding: "3% 3% 3% 3%",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
};

const sendButton = {
    border: '2px solid black',
    padding: "3% 3% 3% 3%",
    // width: "90%",
    marginLeft: "60%",
    // marginRight: "5%",
    backgroundColor: 'red'
};



//Extend react component:
class ClientChatBox extends React.Component
{



    constructor(props)
    {
        super(props);

        this.state = {
            oneTime: 0,
            placeholderValue: "Type message here!",
            clientMessage: '', //null,
            adminMessage: '', //null,
            completMessage: "Hello there! Chat with admin anytime!", //"No conversation started yet!", //De la client si admin;
            adminChatId: null,
            clientChatId: null,
            //NU MERGE FARA 2!!!
            adminName: null, //'',
            clientName: null, //this.cookieRef.current.state.name, //Din cookie;
            //Am deja: Nu am eroare pe partea de backend aici, doar cele din console log:
            errorStatus: 0,
            error: null,
            chatBox: [], //null,
        };

        //Pentru bind, change and submit:
        this.handleChangeClientMessage = this.handleChangeClientMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        // this.showChatBoxSent = this.showChatBoxSent.bind(this);
        // this.reloadHandler = this.props.reloadHandler;
        // this.reload = this.reload.bind(this);

        this.cookieRef = React.createRef();
    }


    // reload()


    //Pentru form:
    // toggleForm() {
    //     this.setState({collapseForm: !this.state.collapseForm});
    // }
    // //Pentru inputs:
    // handleChange = event => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     const updatedControls = this.state.formControls;
    //     const updatedFormElement = updatedControls[name];
    //
    //     updatedFormElement.value = value;
    //     updatedFormElement.touched = true;
    //     updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
    //     updatedControls[name] = updatedFormElement;
    //
    //     let formIsValid = true;
    //     for (let updatedFormElementName in updatedControls) {
    //         formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
    //     }
    //
    //     this.setState({
    //         formControls: updatedControls,
    //         formIsValid: formIsValid
    //     });
    // };



    //Connect + Disconnect:
    onConnected()
    {
        console.log("Connected! Client-Admin")
    }
    onDisconnected()
    {
        console.log("Disconnected! Client-Admin")
    }


    //Touched? Valid?
    handleChangeClientMessage = event => {
        // const name = event.target.name;
        const value = event.target.value;
        //1) Ales din sir de fields:
        //const updatedFields = this.state;
        //const updatedField = updatedFields[name];
        //2) Luat direct:
        // const clientMessageField = this.state.clientMessage;
        // let clientMessageField = this.state.clientMessage;
        let clientMessageField = value;

        //1)
        // updatedField.value = value;
        // updatedField.touched = true;
        // updatedField.valid = validate(value, updatedField.validationRules);
        // updatedFields[name] = updatedField;
        //2)
        // clientMessageField = value;
        //Dar pentru a nu fi redundant:
        // this.state.clientMessage = value;

        //Validari:
        // let formIsValid = true;
        // for (let updatedValidation in updatedFields) {
        //     formIsValid = updatedFields[updatedValidation].valid && formIsValid;
        // }

        //Set final, a datelor:
        this.setState({
            clientMessage: clientMessageField,
            // formControls: updatedFields,
            // formIsValid: formIsValid
        });

        if(this.state.oneTime === 0)
        {
            this.setState({
                chatBox: this.state.chatBox.concat(<Input
                    style={{backgroundColor: "#c20d0d",
                        marginTop: "3%",
                        marginLeft: "2%",
                        marginRight: "2%",
                        width: "95%",
                        textAlign: "center",
                        // fontSize: "small",
                        border: '2px solid black',
                        borderRadius: '8%',
                    }}
                    name='MessageOutput'
                    id='MessageOutput'
                    value={this.state.completMessage}
                    type="textarea"
                    readOnly={true}
                    rows = "2"
                >
                </Input>),
                oneTime: 1,
            });
        }
    };


    sendMessage() {
        //Trebuie si setat ce trimitem:


        //Pentru cand in chat nu ai scris nimic, nu poti trimite;
        //if(this.state.clientMessage === '')
        if(this.state.clientMessage === "")
        {
            console.log("Not sending empty message.");
            // this.state.completMessage = "Cannot send empty message!";
            this.setState({
                // clientMessage: "Cannot send empty message!",
                placeholderValue: "Cannot send empty message!"
            });

        }
        else
        {
            console.log("Sending this message: " + this.state.clientMessage + " .");

            //Set date in state, inainte de submit:
            //In handle change + cookies;
            //Id client:
            let clientId = this.cookieRef.current.state.id;
            // let clientId = this.cookieRef.current.props.cookies.get("id");\
            //Id admin (hardcodat, pentru ca toti clientii vorbesc cu acelasi admin, 1 singur sa zicem)
            let adminId = 'e50762ef-1719-471e-8315-b0576da2af6f';
            //Numele cine trimite:
            let name = this.cookieRef.current.state.name;

            //Create object pentru trimis, cu datele de mai sus:
            let clientMessageObject = {
                clientMessage: this.state.clientMessage,
                name: name,
                clientId: clientId,
                adminId: adminId
            };

            //console.log("Test chatBox 1: " + clientMessageObject.clientMessage);
            //console.log("Test chatBox 2: " + clientMessageObject.clientId);
            //clientMessageObject.clientId.toString());
            //clientId); //clientMessageObject.clientId);


            //PENTRU CAND TRIMITI DATE, AFISARE IN CHAT BOX:
            this.showChatBoxSent();

            //this.state.completMessage = "New message!";

            console.log(clientMessageObject);
            this.messageFromClientToAdmin(clientMessageObject);
        }
    }



    //DE LA CLIENT TRIMIS DATE:
    messageFromClientToAdmin(message) {
        return API_CLIENT.messageFromClientToAdmin(message, (result, status, error) =>
        {
            //Resultul de la POST nu este folosit la nimic, aia este ideea;
            if (result !== null && (status === 200 || status === 201)) { //Status 200, 201 = ambele OK;
                // console.log("Successfully inserted user with id: " + result + " !");
                // this.reloadHandler(); //Predefinit?
                //console.log("Test chatBox: " + result);
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }


    //DE LA ADMIN PRIMIT DATE;
    onMessageReceived(adminMessage)
    {
        //Contine mesaj admin, id admin, id client; (Si de acolo extras toate datele);
        //Daca nu ar fi chat bidirectional, nu tiar trebui toate datele, dar daca este,
        //atunci mai usor este sa chiar trimiti de fiecare data datele folositoare;

        //Numele este bun aici:
        console.log(adminMessage);

        //Se primesc date, se seteaza:
        //Se verifica daca este clientul bun, deci daca are id-ul acelasi cu cel din cookies:
        if(adminMessage.clientId === this.cookieRef.current.state.id) //UUID;
        {
            //In state ramane cu cine am facut conversatia, pentru urmatoarea trimitere;
            this.setState({
                //Salvez toate datele:
                adminMessage: adminMessage.clientMessage,
                adminChatId: adminMessage.adminId,
                clientChatId: adminMessage.clientId,
                //adminName: adminMessage.adminName,
                adminName: adminMessage.name
            });



            //Dupa setarea datelor, trebuie afisarea si procesarea lor:
            //PENTRU CAND PRIMESTI DATE, AFISARE IN CHAT BOX:
            this.showChatBoxReceived();
        }
        //Else, nu se seteaza nimic, merge flowul ca si cum nu s-a intamplat nimic;
    }


    //Testare pentru cand se trimit:
    showChatBoxSent()
    {
        console.log("Insert client message.");


        //A) 1 DIV:
        //Test:
        // this.state.completMessage = "New Message!";
        // if(this.state.completMessage === "No conversation!")
        // {
        //     //Il reseteaza;
        //     this.state.completMessage = "";
        // }
        // if(this.state.completMessage === "Cannot send empty message!")
        // {
        //     //Il reseteaza;
        //     this.state.completMessage = "";
        // }

        //Se adauga la mesajul vechi, mesajul nou:
        //SET STATE SCHIMBA DIRECT CU UN REFRESH, ALTFEL DOAR SE PUNE VALOAREA SI NEXT TIME SE FACE REFRESH IDK;
        //FARA SET STATE:
        // let messageComplet = this.state.completMessage + this.cookieRef.current.state.name + ": " + "\n";
        // messageComplet = messageComplet + this.state.clientMessage + "\n\n";
        //CU SET STATE: (la final, mai refac si zona de chat goala)
        // this.setState({
        //     //Salvez toate datele:
        //     completMessage: messageComplet,
        //     clientMessage: "",
        //     placeholderValue: "Type message here!"
        // });


        //B) N DIVS:
        //Direct cookie:
        this.state.completMessage = this.cookieRef.current.state.name + ":\n"; //clientName + ":\n";
        this.state.completMessage = this.state.completMessage + this.state.clientMessage;
        //Pentru add inputs multiple:

        let totalRows = 1;
        let nrRowsFromChars = 0; //-this.cookieRef.current.state.name.length; //(Scad cat am de la nume)
        //Verific cate spatii noi am:
        //28 charactere: aaaaaaaaaaaaaaaaaaaaaaaaaaaa;
        for (let i = 0; i < this.state.completMessage.length; i++)
        {
            if(this.state.completMessage[i] === "\n")
            {
                totalRows++;
                nrRowsFromChars = 0; //Se reseteaza randul;
            }
            else
            {
                nrRowsFromChars++;
                //Nu stiu de ce dar merge 29;
                if(nrRowsFromChars === 29)
                {
                    totalRows++;
                    nrRowsFromChars = 0;
                }
            }
        }

        //DREAPTA:
        this.setState({
            chatBox: this.state.chatBox.concat(<Input
                style={{backgroundColor: "#36ab0e",
                        // padding: "3% 3% 3% 3%",
                        marginLeft: "5%",
                        marginTop: "3%",
                        width: "70%",
                        fontSize: "small",
                        border: '2px solid black',
                        borderRadius: '8%',
                        resize: "none", //"both",//"auto", //"none",
            }}
                name='MessageOutput'
                id='MessageOutput'
                type="textarea"
                readOnly={true}
                value={this.state.completMessage}
                rows = {totalRows}
                // resize: none
                // resize="none"
                // rows = "3"
                // disabled
                // required
            >
            </Input>),
            clientMessage: "",
            placeholderValue: "Type message here!"
        });

        //STANGA:
        // this.setState({
        //     chatBox: this.state.chatBox.concat(<Input
        //         style={{backgroundColor: "#24e8c4",
        //             marginLeft: "27%",
        //             marginTop: "3%",
        //             width: "70%",
        //             fontSize: "small",
        //             border: '2px solid black',
        //             borderRadius: '8%',
        //             resize: "none",
        //         }}
        //         name='MessageOutput'
        //         id='MessageOutput'
        //         type="textarea"
        //         readOnly={true}
        //         // Daca este variabila, poti pune acolade; Si la functie?
        //         // rows={this.state.completMessage.length / 27 + 3}
        //         rows={totalRows}
        //         value={this.state.completMessage}
        //     >
        //     </Input>),
        //     clientMessage: "",
        //     placeholderValue: "Type message here!"
        // });


        //Pentru refresh la pagina, sa afiseze bine: Asta face refresh la toata pagina:
        //a)
        // window.location.reload(false);
        //b)
        // this.reloadHandler();
    }


    //Testare pentru cand se primesc:
    showChatBoxReceived()
    {
        console.log("Insert admin message.");


        //Nu datele din cookies, ci datele primite de la admin:
        this.state.completMessage = this.state.adminName + ":\n"; //nu name aici!!!
        this.state.completMessage = this.state.completMessage + this.state.adminMessage;

        console.log("Name: " + this.state.name);

        let totalRows = 1;
        let nrRowsFromChars = 0;
        //28 charactere: aaaaaaaaaaaaaaaaaaaaaaaaaaaa;
        for (let i = 0; i < this.state.completMessage.length; i++)
        {
            if(this.state.completMessage[i] === "\n")
            {
                totalRows++;
                nrRowsFromChars = 0;
            }
            else
            {
                nrRowsFromChars++;
                if(nrRowsFromChars === 29)
                {
                    totalRows++;
                    nrRowsFromChars = 0;
                }
            }
        }

        //STANGA:
        //Set doar la date, nu mai trebuie nimic afisat sau reactualizat:
        this.setState({
            chatBox: this.state.chatBox.concat(<Input
                style={{backgroundColor: "#24e8c4",
                    marginLeft: "27%",
                    marginTop: "3%",
                    width: "70%",
                    fontSize: "small",
                    border: '2px solid black',
                    borderRadius: '8%',
                    resize: "none",
                }}
                name='MessageOutput'
                id='MessageOutput'
                type="textarea"
                readOnly={true}
                rows={totalRows}
                value={this.state.completMessage}
            >
            </Input>),
        });


        //Dupa procesare, cum raman datele:
        //Message: cel care il primesti, nu il folosesti decat la o noua primire;
        //Name: tot la primire il folosesti;
        //CID: tinut in cookies, tot timpul corect;
        //AID: hardcodat, deci nu conteaza la trimitere, tot timpul acelasi;

        //Pe parte de admin, trebuie prima data un receive, dupa un send (OBLIGATORIU)
        // a) In state admin, clientId la inceput este random, si pentru ca nu este bun, pe else scriu la placeholder
        //ca nu se poate trimite mesaj la client, nu exista inca un client; (client id uuid dummy)
        // b) Primirea se face ca si la client; (salvare + afisare date) (+ primit date de oricate ori)
        // c) Pentru ca acum in state exista un client id bun, trece de testul dummy,
        //si acum sigur client id este unul bun, la care se pot trimite date;
        //Restrictie la admin in fct de client id, Nu este restrictie la client, tot timpul id admin hardcodat
        //(daca exista un nou admin, se schimba in cod codul sau!)
    }


    render() {
        return (
            <div style={chatBox}>

                <br/>


                <SockJsClient
                    url={SOCKET_URL}
                    // topics={['/passingMaxValue/messageToClient']}
                    //Nu trimite asa:
                    // topics={['/passingMessageToAdmin/messageToAdmin']}
                    //Nu trimite asa:
                    topics={['/passingMessageToClient/messageToClient']}
                    onConnect={this.onConnected}
                    onDisconnect={this.onDisconnected}
                    onMessage={messageFromAdmin => this.onMessageReceived(messageFromAdmin)}
                    debug={false}
                />


                <Label for='MessageBox'
                       style={messageLabel}> Message Box (with admin): </Label>

                <br/>
                <br/>

                <Label style = {{marginLeft: "7%"}}> Chat history:
                </Label>





                {/*INPUT BOX INITIAL:*/}
                {/*<Input name='MessageOutput'*/}
                {/*       id='MessageOutput'*/}
                {/*       style={messageOutput}*/}
                {/*       value={this.state.completMessage}*/}
                {/*       // onChange={this.handleChangeChatBox}*/}
                {/*       // onChange={newValue => this.setState({ value : newValue.target.value })}*/}
                {/*       //1)*/}
                {/*       // placeholder={this.state.completMessage}*/}
                {/*       // placeholder={this.state.clientMessage}*/}
                {/*       // onChange={this.handleChangeAdmin}*/}
                {/*       //2)*/}
                {/*       // placeholder="Type here! aaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaaa aaaaaaaa*/}
                {/*       // aaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa"*/}
                {/*       type = "textarea"*/}
                {/*       rows = "15"*/}
                {/*       readOnly={true}*/}
                {/*       required*/}
                {/*/>*/}


                <br/>


                {/*INPUT BOX NOU: (div this time)*/}
                <div
                    style = {messageOutput}
                >
                    {this.state.chatBox}
                </div>



                <br/>

                {/*Name nu am folosit, doar Value:*/}
                {/*Face update la state, ar trebui mai sus sa se afiseze noua valoare*/}
                {/*Value este client message pentru a reusi sa se reseteze cu set message*/}
                <Input name='clientMessage'
                       id='clientMessageField'
                       style={messageInput}
                       placeholder={this.state.placeholderValue} //"Type here!"
                       defaultValue={this.state.clientMessage}
                       value={this.state.clientMessage}
                       type = "textarea"
                       rows = "2" //"3"
                       onChange={this.handleChangeClientMessage}
                       // defaultValue={this.state.formControls.title.value}
                       // touched={this.state.formControls.title.touched? 1 : 0}
                       // valid={this.state.formControls.title.valid}
                       required //Daca apesi pe buton, required sa fie ceva in!
                />

                <br/>

                <Row>
                    <Col sm={{size: '4', offset: 5}}>
                        <Button type={"submit"}
                                // disabled={!this.state.formIsValid}
                                // style = {{backgroundColor: '#ab1111'}}
                                onClick={this.sendMessage}
                            style = {sendButton}
                        >  Send Message
                        </Button>
                    </Col>
                </Row>

                <br/>

                <UserCookie ref={this.cookieRef} />

            </div>
        ) ;
    }
}


export default ClientChatBox;







