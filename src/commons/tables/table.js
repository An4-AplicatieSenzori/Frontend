//Importuri:
import React, {Component} from "react";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Field from "./fields/Field";
import {Col, Row} from "react-bootstrap";

//Avem CLASE sau FUNCTII!
//Clasa cu constructor: Tot timpul props;
class Table extends Component
{
    //Constructor:
    constructor(props) {
        super(props);

        //Max size 10 pagini?
        this.state = {
            data: props.data,
            columns: props.columns,
            search: props.search,
            filters: [],
            getTrPropsFunction: props.getTrProps,
            pageSize: props.pageSize || 10,
        };
    }

    //Nimic la search; Dar merge;
    search()
    {
    }

    //Search foloseste filter?
    //Primim data: For each data, daca este gol, acceptam;
    //Accessor este data dinauntru valorii?
    filter(data) {
        let accepted = true;

        this.state.filters.forEach(val => {
            if (String(val.value) === "") {
                accepted = true;
            }

            //Daca include valoarea data, defapt daca se includ reciproc:
            if (!String(data[val.accessor]).includes(String(val.value))
                && !String(val.value).includes(String(data[val.accessor]))) {
                //Asa nu acceptam? Asa nu il filtreaza, ci il da direct;
                accepted = false;
            }
        });

        //Returnam ce filtram: Defapt not sus, deci poate return doar ce trebuie;
        return accepted;
    }

    //Cand schimbi ceva, adaugi ceva, forteaza update;
    handleChange(value, index, header) {
        if (this.state.filters === undefined)
        {
            //this.setState('By Name');
            this.setState({filters: []});
        }
        //this.setState({filters: []});

        this.state.filters[index] = {
            value: value.target.value,
            accessor: header
        };
        this.forceUpdate();
    }

    //Aliniere centru scris;
    getTRPropsType(state, rowInfo) {
        if (rowInfo) {
            return {
                style: {
                    textAlign: "center"
                }
            };
        }
        else
            return {};
    }

    //Daca dai extend la componenta, poti folosi RENDER!!!
    render() {
        //Folosesti data filtrata: Ca un if:
        let data = this.state.data ? this.state.data.filter(data => this.filter(data)) : [];

        //On change, se schimba ce trebuie;
        //header.accessor
        return (
            <div>
                <Row style = {{width: '80%'}}>
                    {
                        //style = "background-color: red;"
                        this.state.search.map((header, index) => {
                            return (
                                <Col key={index}>
                                    <div>
                                        <Field id={header.accessor} label='Filter By Name'
                                               onChange={(e) => this.handleChange(e, index, header.accessor)}/>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
                <p></p>
                <Row>
                    <Col>
                        <ReactTable
                            data={data}
                            resolveData={data => data.map(row => row)}
                            columns={this.state.columns}
                            defaultPageSize={this.state.pageSize}
                            getTrProps={this.getTRPropsType}
                            showPagination={true}
                            style={{
                                height: '350px',
                                //padding: '0.5% 0.5% 0.5% 0.5%',
                                //backgroundcolor: 'red',
                                //color: 'red',
                                //backgroundcolor: red
                            }}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

//In toate JS exista exporturi;
//Poti da export la clasa sau la functie!!!
//De ce si pe row si pe col?
export default Table;




