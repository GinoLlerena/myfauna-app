import React from "react"

export function CheckBox(props){
    const { id, onChange, description, value } = props
    const onChangeCheckbox = e => onChange(id, e.target.checked)

    return(
        <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" id={id} onChange={onChangeCheckbox} checked={value}  />
            <label className="form-check-label" htmlFor={id}>
                {description}
            </label>
        </div>
    )
}


function Radio(props){
    const { option, onChange, checked } = props
    const {id, description} = option

    return(
        <div className="form-check">
            <input className="form-check-input" type="radio" name={id} id={id} value={id} onChange={onChange} checked={checked} />
            <label className="form-check-label" htmlFor={id}>
                {description}
            </label>
        </div>
    )
}

export function RadioGroup(props){
    const { description, options, onChange, id, value } = props
    const onChangeRadio = e => onChange(id, e.target.value)
    return(
        <fieldset className="form-group">
            <div className="row">
                <legend className="col-form-label col-sm-2 pt-0">{description}</legend>
                <div className="col-sm-10">
                    {options.map((opt,i) => <Radio key={i} option={opt} onChange={onChangeRadio} checked={value === opt.id}  />)}
                </div>
            </div>
        </fieldset>
    )
}

export function TextInput(props){
    const { id, value, onChange, description, readOnly, defaultValue } = props;
    const onChangeText = e => onChange(id, e.target.value)
    return(
        <div className="mb-3">
            <label className="form-label">{description}</label>
            <input type="text" defaultValue={defaultValue} value={value} readOnly={readOnly} onChange={onChangeText} className={`${ readOnly ? 'form-control-plaintext' : 'form-control'}`} />
        </div>
    )
}

function getOptions(options, value){
    const list = options.map( (opt, i) => <option key={i} id={opt} >{opt}</option>)
    return (list)
}

export function CustomDropDown(props){
    const { id, value, onChange, options, description } = props;
    const onChangeSelect = e => onChange(id, e.target.value)
    return(
        <div className="form-group">
            <label>{description}</label>
            <select defaultValue={value} onChange={onChangeSelect} className="form-control" >
                {getOptions(options, value)}
            </select>
        </div>
    )
}