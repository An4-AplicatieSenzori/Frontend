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
    clientDevice: '/device'
};


//La user id nu trebuie?
//La get doar cu id putem sa trimitem mai departe la backend ceva;
//+ "/";
//Mai complicat decat credeam;
function getClientDevices(callback) {
    //let request = new Request(HOST.backend_api + endpoint.clientDevice + "/clientDevices" + "/" + params.id, {
    let request = new Request(HOST.backend_api + endpoint.clientDevice + "/clientDevices", {
        method: 'GET',
    });

    console.log(request.url); //400!!!
    RestApiClient.performRequest(request, callback);
}


function getClientData(callback) {
    let request = new Request(HOST.backend_api + endpoint.clientUser + "/clientData", {
        method: 'GET',
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);

    // console.log("Nume: " + this.clientCurent.name + " ,Email: " + this.clientCurent.email +
    //     ",Age: " + this.clientCurent.age + " ,Address: " + this.clientCurent.address);
}


//Same function:
function getUserRole(callback){
    let request = new Request(HOST.backend_api + endpoint.clientUser + "/userRole", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


/*
function getUserId(callback){
    let request = new Request(HOST.backend_api + endpoint.clientUser + "/userId", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
*/


function getUserName(callback){
    let request = new Request(HOST.backend_api + endpoint.clientUser + "/userName", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

//Nu trebuie functie pentru buton de back;

export {
    getUserRole,
    getClientData,
    //getUserId,
    getUserName,
    getClientDevices,
};





