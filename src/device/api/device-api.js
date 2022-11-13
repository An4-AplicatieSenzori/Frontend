import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    device: '/device',
    user: '/user'
};


function getUserRole(callback){
    let request = new Request(HOST.backend_api + endpoint.user + "/userRole", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


//Get all:
function getDevices(callback) {
    let request = new Request(HOST.backend_api + endpoint.device, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

//Get 1 by id:
function getDeviceById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.device + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

//Post 1:
function postDevice(device, callback){
    let request = new Request(HOST.backend_api + endpoint.device , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getUserRole,
    getDevices,
    getDeviceById,
    postDevice
};






