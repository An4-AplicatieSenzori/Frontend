//Imports:
import React from 'react';
import {HOST} from '../../commons/hosts';
import SockJsClient from 'react-stomp';
//For hooks: { useState }
//import Host from "../../commons/hosts";
//Nu trebuie api, nu trebuie legatura cu get / post;
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";

//Aceasta este legatura cu backend-ul;
//const SOCKET_URL = 'http://localhost:8080/webSocketMessage';
//Constanta poate sta inafara;
const SOCKET_URL = HOST.backend_api + '/webSocketMessage';



//Pentru cum merge acest websocket:
//Daca user-ul nu este logat, nu va trimite data!
//Dar daca este logat, atunci se trimite!
//Daca se trimit mai multe date, se actualizeaza div-ul cu ultima data trimisa!
//Deci se pierd datele anterioare ca notificari!

//1) Versiune cu hooks:
// const ClientWebSocket = () => {
//     //const [message, setMessage] = useState('The message is here!');
//     const [deviceID, setDeviceID] = useState('4399d95f-fbc2-44e4-afa1-55e709462358');
//     const [currentTime, setCurrentTime] = useState(new Date());
//     const [value, setValue] = useState(1.0);
//
//     let onConnected = () => {
//         console.log("Connected!")
//     }
//
//     let onDisconnected = () => {
//         console.log("Disconnected!")
//     }
//
//     //Obiectul DTO: setez toate datele sa fie bine puse:
//     let onMessageReceived = (deviceData) => {
//         setDeviceID(deviceData.deviceID);
//         setCurrentTime(deviceData.currentTime);
//         setValue(deviceData.value);
//     }
//
//     return (
//         <div>
//             <SockJsClient
//                 url={SOCKET_URL}
//                 topics={['/passingMaxValue/messageToClient']} //topic/message;
//                 onConnect={onConnected}
//                 onDisconnect={onDisconnected}
//                 onMessage={deviceData => onMessageReceived(deviceData)}
//                 debug={false}
//             />
//             <div>
//                 <h1>
//                     The device with id {deviceID} with value {value} exceeded the limit at {currentTime} !
//                 </h1>
//             </div>
//         </div>
//     );
// }




//deviceData primeste onMessage, si dupa foloseste datele lui!
//2) Versiune cu clase:

class ClientWebSocket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //DTO-ul cu datele sale;
            deviceData: {
              deviceID: '[]', //'4399d95f-fbc2-44e4-afa1-55e709462358',
              currentTime: '[]', //'2022-12-12 00:00:00',//null, //new Date(),
              value: '[]', //1.0
            },
            errorStatus: 0,
            error: null,
        };
    }

    //HandleChange?

    //Pentru daca se conecteaza:
    onConnected()
    {
        console.log("Connected!")
    }

    //Pentru daca se deconecteaza:
    onDisconnected()
    {
        console.log("Disconnected!")
    }

    //Obiectul DTO: setez toate datele sa fie bine puse:
    onMessageReceived(deviceDataCorrect)
    {
        //setState prestabilit:
        //Asa setezi date in state:
        //Se face set data si daca nu am tipul de date bun!!!
        this.setState({
            deviceData: {
                deviceID: deviceDataCorrect.deviceID,
                currentTime: deviceDataCorrect.currentTime,
                value: deviceDataCorrect.value
            }
        });
    }

    render() {
        return(
            <div>

                <SockJsClient
                    url={SOCKET_URL}
                    topics={['/passingMaxValue/messageToClient']} //topic/message;
                    onConnect={this.onConnected}
                    onDisconnect={this.onDisconnected}
                    onMessage={deviceData => this.onMessageReceived(deviceData)}
                    debug={false}
                />

                <div>
                    <h3 style = {{textAlign: "center", backgroundColor: "#ee4141",
                    padding: "3% 3% 3% 3%", marginLeft: "17%", marginRight: "17%"}}>
                        The device with id: {this.state.deviceData.deviceID} with
                        value: {this.state.deviceData.value} exceeded
                        the limit at: {this.state.deviceData.currentTime} !
                    </h3>
                </div>

            </div>
        )
    }
}


/*

margin: "5% 5% 5% 5%"

Nu merge de la faptul ca am current time prost! Nu stiu ce are cu tipul!
NU POT ASA!
<h1>
                        The device with id {this.state.deviceData.deviceID}
                        with value {this.state.deviceData.value}
                        exceeded the limit at {this.state.deviceData.currentTime} !
                    </h1>

 */


export default ClientWebSocket;







