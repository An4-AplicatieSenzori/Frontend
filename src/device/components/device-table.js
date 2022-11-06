import React from "react";
import Table from "../../commons/tables/table";
//Pentru User + Device! Ambele!

const columns = [
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Address',
        accessor: 'address',
    },
    {
        Header: 'HourlyConsumption',
        accessor: 'hourlyConsumption',
    }
];

const filters = [
    {
        accessor: 'title',
    }
];

class DeviceTable extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

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

export default DeviceTable;












