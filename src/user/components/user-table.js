//Imports:
import React from "react";
import Table from "../../commons/tables/table";



//AICI PUI TOATE FIELDURILE PE CARE LE AFISEZI;
//Header + accessor pentru tabele!!!
//Constanta coloane: Apar cele 2:
const columns = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Age',
        accessor: 'age',
    },
    {
        Header: 'Address',
        accessor: 'address',
    },
    {
        Header: 'Email',
        accessor: 'email',
    }
    /*
    ,
    {
        Header: 'Password',
        accessor: 'password',
    }
    */
];



//AICI PUI TOATE FIELDURILE DUPA CARE FILTREZI:
//Filter de nume: Doar asta aparea!!!
const filters = [
    {
        accessor: 'email',
    },
    /*
    {
        accessor: 'name',
    }
    {
        accessor: 'age',
    },
    {
        accessor: 'address',
    },
    */
];



//Clasa de returnat, componenta:
class UserTable extends React.Component {

    //Un constructor:
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }



    //Doar un tabel cu date! Nimic special!
    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}



//Export la asta!
export default UserTable;












