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


function getDevices(callback) {
    let request = new Request(HOST.backend_api + endpoint.clientDevice, {
        method: 'GET',
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


//Same function:
function getUserRole(callback){
    let request = new Request(HOST.backend_api + endpoint.clientUser + "/userRole", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


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
    getUserName,
    getDevices,
};





