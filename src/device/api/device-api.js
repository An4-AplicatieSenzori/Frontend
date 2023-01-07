import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    device: '/device',
    user: '/user'
};



//Avem asa:
//1) Get: User Role; (Nefolosit)
//2) Get: All Devices; (Toate datele lor)
//3) Get: A Device By ID (Nefolosit);
//4) Post: Insert Device;
//5) Post: Update Device;
//6) Post: Delete Device;



// function getUserRole(callback){
//     let request = new Request(HOST.backend_api + endpoint.user + "/userRole", {
//         method: 'GET',
//     });
//     console.log(request.url);
//     RestApiClient.performRequest(request, callback);
// }


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


function updateDevice(device, callback){
    let request = new Request(HOST.backend_api + endpoint.device + "/updateDevice", {
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



function deleteDevice(device, callback){
    let request = new Request(HOST.backend_api + endpoint.device + "/deleteDevice", {
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
    //getUserRole,
    updateDevice,
    deleteDevice,
    getDevices,
    getDeviceById,
    postDevice
};






