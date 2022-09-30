import React from 'react'
import {CheckBox, CustomDropDown, RadioGroup, TextInput} from "./FormElements";
import {isEmpty} from "lodash";

function CustomForm(props){
   const { onChange, valueMap, onNewElement, onInsert, onUpdate, onCancel, onDelete } = props

    const { id, context } = valueMap

    const onHandleChange = (key, value) => onChange(key, value)

    const onValidate = _ => {
        //const result = validate(state)
        //console.log('Result', result)
    }

    const isNew = (valueMap.id === 'New Element')
    const empty = isEmpty(valueMap.id)

    return(
        <form>
            {!empty && <TextInput description={'Id'} id={'id'} value={id} readOnly={true} />}
            {!empty && <TextInput description={'context'} onChange={onHandleChange} id={'context'} value={context} />}

            <div className={'d-grid gap-2 d-md-flex'}>
                {!isNew && <button type="button" className="btn btn-primary" onClick={onNewElement}>New</button>}
                {!empty && <button type="button" className="btn btn-primary" onClick={isNew ? onInsert : onUpdate}>{isNew ? 'Insert' : 'Update'}</button>}
                {!empty && <button type="button" className="btn btn-primary" onClick={isNew ? onCancel : onDelete} >{isNew ? 'Cancel' : 'Delete'}</button>}
            </div>
        </form>
    )

}

export default  CustomForm