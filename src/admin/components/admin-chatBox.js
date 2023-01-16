import React from 'react';
import * as API_ADMIN from "../api/admin-api";
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


const SOCKET_URL = HOST.backend_api + '/webSocketMessageAdmin';

const SOCKET_URL_TYPING = HOST.backend_api + '/webSocketMessageTypingAdmin';
const SOCKET_URL_READ = HOST.backend_api + '/webSocketMessageReadAdmin';


const chatBox = {
    border: '8px solid red',
    borderRadius: '1%',
    //width: '25%',
    width: '50%',
    height: '100%',
    float: 'left',
    marginLeft: "6%",
    marginTop: "3%",
    marginBottom: "5%",
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
    fontSize: "large",
};

const typingMessageClient = {
    // padding: "1% 1% 1% 1%",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "7%",
    textAlign: "center",
    fontSize: "8vh",
    color: "#24e8c4",
};

const readMessageClient = {
    // padding: "1% 1% 1% 1%",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "2%",
    textAlign: "center",
    fontSize: "3vh",
    color: "black", //"#24e8c4",
    // height: "0%",
    backgroundColor: "#c20d0d",
};

const messageOutput = {
    border: '2px solid black',
    backgroundColor: "#1a38e0",
    width: "90%",
    marginLeft: "5%",
    overflowY: "scroll",
    minHeight: "40vh",
    maxHeight: "40vh",
    paddingBottom: "3%",
};

const messageInput = {
    border: '2px solid black',
    padding: "3% 3% 3% 3%",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    resize: "none"
};

const sendButton = {
    border: '2px solid black',
    padding: "3% 3% 3% 3%",
    marginLeft: "60%",
    backgroundColor: 'red'
};



class AdminChatBox extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            oneTime: 0,
            placeholderValue: "Message here.",
            clientMessage: '',
            clientTyping: null,
            clientRead: null,
            adminMessage: '',
            completMessage: "Waiting for clients...",
            adminChatId: null, //Din cookie direct;
            clientChatId: "84bc52fe-f873-4f71-9f68-675f5b5c2fd4", //Randomly generated UUID, Probabil nu il am si eu; //null,
            //IMI TREBUIE NUME SI LA CLIENT SI LA ADMIN: Nu pot direct de aici, dau cookie mai jos;
            adminName: null, //this.cookieRef.current.state.name,
            clientName: null,
            errorStatus: 0,
            error: null,
            chatBox: [],
            lastSent: null,
        };

        //Pentru onclick, trebuie bind!!!
        this.handleChangeAdminMessage = this.handleChangeAdminMessage.bind(this);
        this.handleRead = this.handleRead.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        //Referinta la div de input, cel de output mesaje:
        this.messageOutputDiv = React.createRef();
        this.cookieRef = React.createRef();
        // this.autoScrollDown = React.createRef();
    }


    //From top to bottom? +- nu merge pentru scroll height;
    scrollMessagesDown = () => {
        this.messageOutputDiv.current.scroll({ top:
            this.messageOutputDiv.current.scrollHeight, behavior: 'smooth' });
    };


    //Pentru auto scroll:
    //Update pentru scroll!!!
    componentDidUpdate()
    {
        //Down sau Top?
        // this.autoScrollDown.current.scrollTop = this.autoScrollDown.current.scrollHeight;
        // this.autoScrollDown.current.scrollBottom = this.autoScrollDown.current.scrollHeight;

        this.scrollMessagesDown();
    }


    onConnected()
    {
        console.log("Connected! Admin-Client")
    }
    onDisconnected()
    {
        console.log("Disconnected! Admin-Client")
    }

    onConnectedTyping()
    {
        console.log("Connected! Admin-Client Typing")
    }
    onDisconnectedTyping()
    {
        console.log("Disconnected! Admin-Client Typing")
    }

    onConnectedRead()
    {
        console.log("Connected! Admin-Client Read")
    }
    onDisconnectedRead()
    {
        console.log("Disconnected! Admin-Client Read")
    }


    //Se modifica inputul, aici stim daca a citit sau vrea sa scrie ceva;
    handleChangeAdminMessage = event => {
        const value = event.target.value;
        let adminMessageField = value;

        this.setState({
            adminMessage: adminMessageField,
        });

        //Verific sa nu fi avut deja acet mesaj tiparit + sa nu fie deja client (deci sa nu fie UUID-ul deja avut inainte):
        //if(this.state.oneTime === 0 || this.state.clientChatId !== "84bc52fe-f873-4f71-9f68-675f5b5c2fd4")
        if(this.state.oneTime === 0 && this.state.clientChatId !== "84bc52fe-f873-4f71-9f68-675f5b5c2fd4")
        {
            this.setState({
                chatBox: this.state.chatBox.concat(<Input
                    style={{backgroundColor: "#c20d0d",
                        marginTop: "3%",
                        marginLeft: "2%",
                        marginRight: "2%",
                        width: "95%",
                        textAlign: "center",
                        border: '2px solid black',
                        borderRadius: '3%', //'8%',
                    }}
                    name='MessageOutput'
                    id='MessageOutput'
                    value="Chat with clients here!" //"Waiting for clients..." //{this.state.completMessage}
                    type="textarea"
                    readOnly={true}
                    rows = "2"
                    // ref = {this.messageOutputDiv}
                >
                </Input>),
                oneTime: 1,
            });

            //Cand inserez un DIALOG nou, dau scroll in jos!!!
            // this.scrollMessagesDown();
        }



        //Acum exista mesajul adminMessage:
        //Se poate verifica ce forma are, daca este sau nu gol de exemplu:
        //Ori Typing, Ori No Typing, pentru a stii ce trimitem la celalalt! (Mesajul din FrontEnd!)
        //Daca nu este gol, se trimite cu un post (de unde se face apel websocket) la afisarea mesajului "Typing!"!
        //Dca este gol, se trimite cu un post (de unde se face apel websocket) fara afisare de mesaj!

        let clientIdTyping = this.state.clientChatId;
        let typing;
        //Verific daca value este sau nu gol:
        // if(this.state.adminMessage === "")
        // if(this.state.adminMessage.length === 0) //=== 1)
        if(event.target.value === "")
        {
            typing = "" //"NoTyping";
        }
        else
        {
            typing = ". . ."; //"Typing";
        }

        let adminMessageTyping = {
            clientIdTyping: clientIdTyping,
            typing: typing
        };

        this.typingFromAdminToClient(adminMessageTyping);
    };




    handleRead()
    {
        //= event => {
        let clientIdRead = this.state.clientChatId;
        let read;

        //Nu mai trebuie conditie, ci doar cuvantul Read!!!
        //1)
        // if(event.target.value === "")
        // {
        //     read = ""
        // }
        // else
        // {
        //     read = "Read";
        // }
        //2)

        //Aici trebuie sa verific defapt daca ultimul mesaj este sau nu numele meu sau nu;
        //Daca este, nu am la ce sa dau read, daca este, am la ce sa dau read; (Are sens)
        if(this.state.lastSent !== "me")
        {
            read = "Read";
        }
        else
        {
            //Not me, deci nu este nevoie!!!
            read = "";
        }

        let adminMessageRead = {
            clientIdRead: clientIdRead,
            read: read
        };

        this.readFromAdminToClient(adminMessageRead);
    };



    //LOGICA IN PLUS PENTRU A NU PUTEA DECAT SA TRIMITA INAPOI, NU SI PRIMUL:
    sendMessage()
    {
        if(this.state.adminMessage === "")
        {
            console.log("Not sending empty message.");
            this.setState({
                placeholderValue: "Cannot send empty message!"
            });
        }
        //Daca nu este gol, si nu este client, il fac gol si nu las sa trimita!
        else if(this.state.clientChatId === "84bc52fe-f873-4f71-9f68-675f5b5c2fd4") //(this.state.adminMessage === "")
        {
            console.log("Not sending message, no client.");

            //In plus, fac mesajul gol iara:
            this.setState({
                placeholderValue: "Cannot send message yet! No client!",
                adminMessage: ""
            });
        }
        else
        {
            console.log("Sending this message: " + this.state.adminMessage + " .");

            let adminId = this.cookieRef.current.state.id;
            //Hardcodat userul trei:
            //Pot lua direct din state pentru ca prima data fac receive!!!
            let clientId = this.state.clientChatId; //User 3: '7504b4e5-b13e-4db3-bce5-a53505cc1670';
            //Admin: 'e50762ef-1719-471e-8315-b0576da2af6f';

            let name = this.cookieRef.current.state.name;

            //Aceeasi ordine la obiect:
            let adminMessageObject = {
                //Nu adminMessage aici!!!
                clientMessage: this.state.adminMessage,
                name: name,
                //adminId: adminId,
                clientId: clientId,
                adminId: adminId
            };

            this.showChatBoxSent();
            // this.scrollMessagesDown();

            console.log(adminMessageObject);
            this.messageFromAdminToClient(adminMessageObject);

            // this.scrollMessagesDown();
        }
    }


    messageFromAdminToClient(message) {
        return API_ADMIN.messageFromAdminToClient(message, (result, status, error) =>
        {
            if (result !== null && (status === 200 || status === 201))
            {
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }


    typingFromAdminToClient(typing) {
        return API_ADMIN.typingFromAdminToClient(typing, (result, status, error) =>
        {
            if (result !== null && (status === 200 || status === 201))
            {
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }


    readFromAdminToClient(read) {
        return API_ADMIN.readFromAdminToClient(read, (result, status, error) =>
        {
            if (result !== null && (status === 200 || status === 201))
            {
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }


    //???
    onMessageReceived(clientMessage)
    {
        console.log(clientMessage);

        if(clientMessage.adminId === this.cookieRef.current.state.id)
        {
            this.setState({
                //Acelasi nume, nu admin message aici:
                clientMessage: clientMessage.clientMessage,
                //CONTEAZA ORDINEA AICI, VOI LUA ASA!!!
                //1)
                adminChatId: clientMessage.adminId,
                clientChatId: clientMessage.clientId,
                //2)
                // adminChatId: clientMessage.clientId,
                // clientChatId: clientMessage.adminId,

                //Nu pot avea decat numele:
                //clientName: clientMessage.clientName,
                clientName: clientMessage.name
            });

            this.showChatBoxReceived();
        }
    }


    onMessageTypingReceived(clientTyping)
    {
        console.log("Is he typing 1: " + clientTyping.typing);

        //ACUM NU COOKIE CI DIN STATE!!! Trebuie verificat ca este diferit de basic;
        //1)
        //if(clientTyping.clientIdTyping === this.state.clientChatId){
        //2)
        if(this.state.clientChatId !== "84bc52fe-f873-4f71-9f68-675f5b5c2fd4")
        {
            //Adaug si numele la typing:
            //let numeConcatenat = this.state.clientName + " is typing " + clientTyping.typing;

            //this.cookieRef.current.state.id) {
            this.setState({
                clientTyping: clientTyping.typing //numeConcatenat //clientTyping.typing
            });

            console.log("Is he typing 2: " + clientTyping);
        }
    }


    onMessageReadReceived(clientRead)
    {
        if(this.state.clientChatId !== "84bc52fe-f873-4f71-9f68-675f5b5c2fd4")
        {
            this.setState({
                clientRead: clientRead.read
            });
        }
    }


    showChatBoxSent()
    {
        console.log("Insert admin message.");

        //Voi pune si ora in mesaj:
        let today = new Date(); //Date.now(); //new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        //Direct cookie:
        this.state.completMessage = this.cookieRef.current.state.name + " (" + time + ")" + ":\n"; //adminName + ":\n";
        this.state.completMessage = this.state.completMessage + this.state.adminMessage;

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

        //DREAPTA:
        this.setState({
            chatBox: this.state.chatBox.concat(<Input
                style={{backgroundColor: "#36ab0e",
                    marginLeft: "5%",
                    marginTop: "3%",
                    width: "70%",
                    fontSize: "small",
                    border: '2px solid black',
                    borderRadius: '3%', //'8%',
                    resize: "none",
                }}
                // ref={this.autoScrollDown}
                // ref = {this.messageOutputDiv}
                name='MessageOutput'
                id='MessageOutput'
                type="textarea"
                readOnly={true}
                value={this.state.completMessage}
                rows = {totalRows}
            >
            </Input>),
            adminMessage: "",
            placeholderValue: "Message here.",
            lastSent: "me", //Eu!
        });

        //Dupa insert mesaj, scroll down!
        // this.scrollMessagesDown();
        // this.scrollMessagesDown();
    }


    showChatBoxReceived()
    {
        console.log("Insert client message.");

        //Voi pune si ora in mesaj:
        let today = new Date(); //Date.now(); //new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        this.state.completMessage = this.state.clientName  + " (" + time + ")" + ":\n";
        this.state.completMessage = this.state.completMessage + this.state.clientMessage;

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
        this.setState({
            chatBox: this.state.chatBox.concat(<Input
                style={{backgroundColor: "#24e8c4",
                    marginLeft: "27%",
                    marginTop: "3%",
                    width: "70%",
                    fontSize: "small",
                    border: '2px solid black',
                    borderRadius: '3%', //'8%',
                    resize: "none",
                    color: "#ffffff",
                }}
                name='MessageOutput'
                id='MessageOutput'
                type="textarea"
                readOnly={true}
                rows={totalRows}
                value={this.state.completMessage}
            >
            </Input>),
            clientTyping: "", //"NoTyping",
            clientRead: "", //Si pentru read!!!
            lastSent: "notMe",
        });

        this.scrollMessagesDown();
    }


    render() {
        return (
            <div style={chatBox}>

                <br/>

                <SockJsClient
                    url={SOCKET_URL}
                    //1) Admin trimite la el;
                    // topics={['/passingMessageToClient/messageToClient']}
                    //2) Trimite;
                    topics={['/passingMessageToAdmin/messageToAdmin']}
                    onConnect={this.onConnected}
                    onDisconnect={this.onDisconnected}
                    onMessage={messageFromClient => this.onMessageReceived(messageFromClient)}
                    debug={false}
                />


                <SockJsClient
                    url={SOCKET_URL_TYPING}
                    topics={['/passingTypingToAdmin/typingToAdmin']}
                    onConnect={this.onConnectedTyping}
                    onDisconnect={this.onDisconnectedTyping}
                    onMessage={typingFromClient => this.onMessageTypingReceived(typingFromClient)}
                    debug={false}
                />


                <SockJsClient
                    url={SOCKET_URL_READ}
                    topics={['/passingReadToAdmin/readToAdmin']}
                    onConnect={this.onConnectedRead}
                    onDisconnect={this.onDisconnectedRead}
                    onMessage={readFromClient => this.onMessageReadReceived(readFromClient)}
                    debug={false}
                />


                <Label for='MessageBox'
                       style={messageLabel}> Message Box (with clients): </Label>

                <br/>
                <br/>

                <Label style = {{marginLeft: "7%"}}> Chat history:
                </Label>


                <br/>


                <div
                    style = {messageOutput}
                    ref = {this.messageOutputDiv}
                >
                    {this.state.chatBox}
                </div>


                <div style = {typingMessageClient}>
                    {this.state.clientTyping}
                    {/*. . .*/}
                </div>


                <div style = {readMessageClient}>
                    {this.state.clientRead}
                    {/*. . .*/}
                </div>


                <br/>


                {/*Aici scriu mesajul:*/}
                <Input name='adminMessage'
                       id='adminMessageField'
                       style={messageInput}
                       placeholder={this.state.placeholderValue}
                       defaultValue={this.state.adminMessage}
                       value={this.state.adminMessage}
                       type = "textarea"
                       rows = "2"
                       //resize = "none"
                       //On Click merge si la Input!!!
                       onClick={this.handleRead}
                       onChange={this.handleChangeAdminMessage}
                       required
                />

                <br/>

                <Row>
                    <Col sm={{size: '4', offset: 5}}>
                        <Button type={"submit"}
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


export default AdminChatBox;







