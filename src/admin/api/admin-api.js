import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    adminUser: '/user',
    adminDevice: '/device'
};

function getUserRole(callback){
    let request = new Request(HOST.backend_api + endpoint.adminUser + "/userRole", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getUserName(callback){
    let request = new Request(HOST.backend_api + endpoint.adminUser + "/userName", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


export {
    getUserName,
    getUserRole,
};





