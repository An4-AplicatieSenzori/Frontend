import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    adminUser: '/user',
    adminDevice: '/device'
};



//Avem asa:
//1) GET: Role pentru a stii unde trebuie redirect, ce pagina;
//2) GET: Name pentru a afisa numele;
//Nu mai am nevoie de name si role acum;


// function getUserRole(callback){
//     let request = new Request(HOST.backend_api + endpoint.adminUser + "/userRole", {
//         method: 'GET',
//     });
//     console.log(request.url);
//     RestApiClient.performRequest(request, callback);
//}

// function getUserName(callback){
//     let request = new Request(HOST.backend_api + endpoint.adminUser + "/userName", {
//         method: 'GET',
//     });
//     console.log(request.url);
//     RestApiClient.performRequest(request, callback);
// }


export {
    //getUserName,
    //getUserRole,
};





