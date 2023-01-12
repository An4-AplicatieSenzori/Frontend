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



const chatBox = {
    border: '8px solid red',
    borderRadius: '3%',
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

const messageOutput = {
    border: '2px solid black',
    backgroundColor: "#1a38e0",
    width: "90%",
    marginLeft: "5%",
    overflowY: "scroll",
    minHeight: "40vh",
    maxHeight: "40vh",
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
            adminMessage: '',
            completMessage: "Waiting for clients...",
            adminChatId: null, //Din cookie direct;
            clientChatId: null,
            //IMI TREBUIE NUME SI LA CLIENT SI LA ADMIN: Nu pot direct de aici, dau cookie mai jos;
            adminName: null, //this.cookieRef.current.state.name,
            clientName: null,
            errorStatus: 0,
            error: null,
            chatBox: [],
        };

        this.handleChangeAdminMessage = this.handleChangeAdminMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.cookieRef = React.createRef();
        // this.autoScrollDown = React.createRef();
    }


    //Pentru auto scroll:
    componentDidUpdate()
    {
        //Down sau Top?
        // this.autoScrollDown.current.scrollTop = this.autoScrollDown.current.scrollHeight;
        // this.autoScrollDown.current.scrollBottom = this.autoScrollDown.current.scrollHeight;
    }


    onConnected()
    {
        console.log("Connected! Admin-Client")
    }
    onDisconnected()
    {
        console.log("Disconnected! Admin-Client")
    }


    handleChangeAdminMessage = event => {
        const value = event.target.value;
        let adminMessageField = value;

        this.setState({
            adminMessage: adminMessageField,
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
        else
        {
            console.log("Sending this message: " + this.state.adminMessage + " .");

            let adminId = this.cookieRef.current.state.id;
            //Hardcodat userul trei:
            let clientId = '7504b4e5-b13e-4db3-bce5-a53505cc1670';
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

            console.log(adminMessageObject);
            this.messageFromAdminToClient(adminMessageObject);
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


    showChatBoxSent()
    {
        console.log("Insert admin message.");

        //Direct cookie:
        this.state.completMessage = this.cookieRef.current.state.name + ":\n"; //adminName + ":\n";
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
                    borderRadius: '8%',
                    resize: "none",
                }}
                // ref={this.autoScrollDown}
                name='MessageOutput'
                id='MessageOutput'
                type="textarea"
                readOnly={true}
                value={this.state.completMessage}
                rows = {totalRows}
            >
            </Input>),
            adminMessage: "",
            placeholderValue: "Message here."
        });
    }


    showChatBoxReceived()
    {
        console.log("Insert client message.");

        this.state.completMessage = this.state.clientName + ":\n";
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


                <Label for='MessageBox'
                       style={messageLabel}> Message Box (with clients): </Label>

                <br/>
                <br/>

                <Label style = {{marginLeft: "7%"}}> Chat history:
                </Label>


                <br/>


                <div
                    style = {messageOutput}
                >
                    {this.state.chatBox}
                </div>



                <br/>


                <Input name='adminMessage'
                       id='adminMessageField'
                       style={messageInput}
                       placeholder={this.state.placeholderValue}
                       defaultValue={this.state.adminMessage}
                       value={this.state.adminMessage}
                       type = "textarea"
                       rows = "2"
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







