import { useReducer, useEffect } from "react";
import { map, cond, filter } from 'lodash/fp'
import {CRUD_TYPE, SERVER_KEY, TABLE_DEF} from "./constants/constants";
import GenTable from "./components/GenTable";
import CustomForm from "./components/Form/CustomForm";
import {addElement, deleteElement, getElements, updateElement} from "./api/api";
import {getFaunaItem} from "./utils/utils";

const callback = (prevState, nextState) => ({ ...prevState, ...nextState })

const defaultState = {
  valueMap: {},
  elements: []
}

function App() {

  const [state, setState] = useReducer(callback, defaultState)

  const onChange = (key, value) => setState({ valueMap: { ...state.valueMap, [key]: value } })

  const handleCRUD = (type) => (error, result) => {

    if (error) {
      console.log(error)
    } else {
      const item = type === CRUD_TYPE.SELECT_ALL ? map(getFaunaItem)(result.data) : getFaunaItem(result)
      const elements = cond([
        [type => type === CRUD_TYPE.INSERT, _ => state.elements.concat([item])],
        [type => type === CRUD_TYPE.UPDATE, _ => map(e => (e.id === item.id ? item : e))(state.elements)],
        [type => type === CRUD_TYPE.DELETE, _ => filter(e => (e.id !== item.id))(state.elements)],
        [type => type === CRUD_TYPE.SELECT_ALL, _ => item],
      ])(type)

      setState({ elements, valueMap: {} })
    }

  }

  const onNewElement = () => {
    const valueMap = {
      id: 'New Element',
      context: ''
    }
    setState({ valueMap })
  }

  const onInsert = () => {
    addElement(SERVER_KEY, { ...state.valueMap }, handleCRUD(CRUD_TYPE.INSERT))
  }

  const onUpdate = () => {
    updateElement(state.valueMap, handleCRUD(CRUD_TYPE.UPDATE))
  }

  useEffect(()=>{
    getElements(SERVER_KEY, handleCRUD(CRUD_TYPE.SELECT_ALL))
    async function fetchData() {
      const data = await  fetch('https://mywranglerapp.gino-llerena.workers.dev/elements')
      console.log('data', data)
    }
    fetchData()
  }, [])

  const onEdit = (e, item) => {
    const valueMap = { ...item }
    setState({ valueMap })
  }

  const onCancel = (e) => {
    setState({ valueMap: {} })
  }

  const onDelete = (e) => {
     deleteElement(state.valueMap, handleCRUD(CRUD_TYPE.DELETE))
  }

  return (
    <>
      <div className={'container'}>
        <CustomForm onChange={onChange} valueMap={state.valueMap} onNewElement={onNewElement} onInsert={onInsert} onCancel={onCancel} onUpdate={onUpdate} onDelete={onDelete} />
      </div>
      <div className={'container'}>
        <GenTable tableDef={TABLE_DEF} data={state.elements} showActions={true} onEdit={onEdit} />
      </div>
    </>
  );
}

export default App;
