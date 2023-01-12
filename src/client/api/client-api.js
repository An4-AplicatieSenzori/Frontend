import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


//Putem avea acces la oricate controlere aici:
//Merge din orice controller, pot accesa mai multe;
//Nu este conexiune intre controllere asa, ci iei de unde doresti;
//Repo, Service nu au legatura intre ele, nici controllerele;
//Din USER iau NUME CURRENT USER;
//Din DEVICES iau DEVICEURI USER ANUME, folosind datele sale;
const endpoint = {
    clientUser: '/user', //Tot user, ca si admin;
    clientDevice: '/device',
    deviceData: '/deviceEnergy',
};





//Avem asa:
//1) Get: All clients Devices;
//2) Get: Client Data; (Nefolosit)
//3) Get: User Role; (Nefolosit)
//4) Get: A User Name; (Nefolosit)
//5) Get: Device data, adica datele sale de energie;
//Luam toate datele sale de energie, si filtram dupa in functie de zi;



//La user id nu trebuie?
//La get doar cu id putem sa trimitem mai departe la backend ceva;
//+ "/";
//Mai complicat decat credeam;
function getClientDevices(userId, callback) {
    //let request = new Request(HOST.backend_api + endpoint.clientDevice + "/clientDevices" + "/" + params.id, {
    let request = new Request(HOST.backend_api + endpoint.clientDevice + "/clientDevices/" + userId, {
        method: 'GET',
    });

    console.log(request.url); //400!!!
    RestApiClient.performRequest(request, callback);
}


// function getClientData(callback) {
//     let request = new Request(HOST.backend_api + endpoint.clientUser + "/clientData", {
//         method: 'GET',
//     });
//
//     console.log(request.url);
//     RestApiClient.performRequest(request, callback);
//
//     // console.log("Nume: " + this.clientCurent.name + " ,Email: " + this.clientCurent.email +
//     //     ",Age: " + this.clientCurent.age + " ,Address: " + this.clientCurent.address);
// }


//Same function:
// function getUserRole(callback){
//     let request = new Request(HOST.backend_api + endpoint.clientUser + "/userRole", {
//         method: 'GET',
//     });
//     console.log(request.url);
//     RestApiClient.performRequest(request, callback);
// }


/*
function getUserId(callback){
    let request = new Request(HOST.backend_api + endpoint.clientUser + "/userId", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
*/


// function getUserName(callback){
//     let request = new Request(HOST.backend_api + endpoint.clientUser + "/userName", {
//         method: 'GET',
//     });
//     console.log(request.url);
//     RestApiClient.performRequest(request, callback);
// }



//Trebuie pusa si bara, ca si pentru id cred!!!
//+ "/deleteUser",
//Stie sa puna in plus fata de url si ce ii dau cu stringify parametru;
//NU POTI PUNE PE RANDURI DIFERITE REQUEST PENTRU CA NU IL IA CA STRING BUN!!!
function getDeviceData(deviceTitle, userId, callback){
    let request = new Request(HOST.backend_api + endpoint.deviceData + "/deviceTitle/" + deviceTitle + "/" + userId, {
        method: 'GET',

        //Stringify si pentru un STRING, sper ca merge sa transmiti asa in backend;
        //Deci ar trebui sa mearga ca pentru int, uuid sau altele;

        //NU TREBUIE STRINGIFY LA GET!!!
        //body: JSON.stringify(deviceTitle)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}




//Trimis mesaj de la CLIENT LA ADMIN:
function messageFromClientToAdmin(message, callback){

    //console.log("Test api 1: " + message.clientMessage);
    //console.log("Test api 2: " + message.clientId);

    let request = new Request(HOST.backend_api + endpoint.clientUser + "/messageFromClientToAdmin", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        //Bad Request?
        //Nu se poate stringify la anumite elemente: Nu se poate la id sau ceva idk;
        body: JSON.stringify(message) //Un obiect cu date in el;
    });

    console.log("URL: " + request.url); //?
    RestApiClient.performRequest(request, callback);
}




//Nu trebuie functie pentru buton de back;
export {
    //getUserRole,
    //getClientData,
    getDeviceData,
    ////getUserId,
    //getUserName,
    getClientDevices,
    messageFromClientToAdmin
};





