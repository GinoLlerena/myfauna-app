import React from 'react'

const RowHedCell = ({title}) => {
    return (<th>{title}</th>)
}

const RowHead = (props) => {
    const { headDefinition, showActions } = props;
    const list = headDefinition.map((row, index) => <RowHedCell key={index} title={row} />)
    return(
        <tr>
            {list}
            {showActions ? <th></th> : null}
        </tr>
    )
}

const RowDataCell = ({value}) => {
    return (<td>{value}</td>)
}

const RowActions = (props) => {
    const { onEdit, onDelete, item } = props

    const onClickEdit = e => onEdit(e, item)
    const onClickRem = e => onDelete(e, item)

    return(
        <td>
            <div className="d-flex flex-row">
                <div>
                    <button type="button" className="btn btn-sm" onClick={onClickEdit}>
                        <i className="material-icons text-warning">edit</i>
                    </button>
                </div>
                <div>
                    <button type="button" className="btn btn-sm" onClick={onClickRem}>
                        <i className="material-icons text-danger">delete</i>
                    </button>
                </div>
            </div>
        </td>
    )
}

const RowData = (props) => {

    const { dataDefinition, item, onEdit, onDelete, showActions } = props;
    const list = dataDefinition.map((prop, index) => <RowDataCell key={index} value={item[prop]} />)

    return(
        <tr>
            {list}
            {showActions && <RowActions onEdit={onEdit} onDelete={onDelete} item={item} /> }
        </tr>
    )
}


const GenTable = (props) => {

    const { tableDef = [], data = [], showActions, onEdit, onDelete } = props;

    const headDefinition = tableDef.map(row => row.columnTitle)
    const dataDefinition = tableDef.map(row => row.columnProp)

    const listOfRows = data.map((item, index) => {
        return(<RowData key={index} item={item} dataDefinition={dataDefinition} showActions={showActions} onEdit={onEdit} onDelete={onDelete}  />)
    })

    return(
        <table className="table table-hover">
            <thead>
                <RowHead headDefinition={headDefinition} showActions={showActions}  onEdit={onEdit} onDelete={onDelete} />
            </thead>
            <tbody>
                {listOfRows}
            </tbody>
        </table>
    )


}

export default GenTable;