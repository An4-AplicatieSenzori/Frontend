//Declari variabila si dai valoare:
let jsonStyles = require('./fields/styles/json-styles');

//Luam Coloane: Header, Accessor;
function getColumns(data) {
    return data.map(c => {
        return({
            Header: c.header,
            accessor: c.accessor,

            //Header: Pentru json culori;
            getHeaderProps: () => {
                return {
                    style: jsonStyles.tableHeaderColors
                }
            },

            //Continut: Pentru table culori:
            getProps: () => {
                return {
                    style: jsonStyles.tableBodyColors
                }
            }
        })
    })
}

//Export columns: La functie:
export  {
    getColumns,
}
