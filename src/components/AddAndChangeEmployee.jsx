import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, changeInfo } from '../redux/actionsCreators/actions';
import InputMask from 'react-input-mask';
import { setActiveEmployee } from '../redux/actionsCreators/actions';
import { useNavigate } from 'react-router-dom'

const AddAndChangeEmployee = () => {
    const dispatch = useDispatch()
    const active = useSelector(({usersInfo}) => usersInfo.activeEmployee)
    const history = useNavigate();

    const [state, setState] = React.useState(() => {
        if (!active)  {
            return {name: '', phone: '', birthday: '', role: 'waiter', isArchive: false}
        } 
        else {
            return {name: active.name,  phone: active.phone, birthday: active.birthday, role: active.role, isArchive: active.isArchive}
        }
    })

    console.log(active)
    console.log(state)
    const handleSubmit = (e) => {
        e.preventDefault()
        !active ?  dispatch(addUser(state)) : dispatch(changeInfo({ id: active.id, ...state}))
        history("/")
    }
   
    const getValue = (e) =>  {
        const name = e.target.name
        const value = e.target.value
        setState({...state, [name]: value})
    }

    const clear = (e) => {
        e.preventDefault()
        setState({name: '', phone: '', birthday: '', role: '', isArchive: false})
    }

    
    return (
        <>
        <button className='btn back' type='button' onClick={() => {history("/"); dispatch(setActiveEmployee(null))}}>◀  Назад</button>
        <form className='container-form' onSubmit={(e) => handleSubmit(e)}>
            <fieldset className='fieldset'>
            <legend>Карточка сотрудника</legend>
                <label> Имя: <input type="text" value={ state.name } name="name"  required  placeholder='Иван Ражев' onChange={ getValue } /></label>
                <label> Номер телефона: <InputMask type="text" value={ state.phone } name="phone"  required  placeholder='+7 (999) 999-99-99' mask='+7 (999) 999-99-99'  onChange={getValue}/></label>
                <label> Дата рождения: <InputMask type="text" value={ state.birthday }  name="birthday"  required  placeholder='28.08.1993' mask='99.99.9999' onChange={ getValue }/></label>
                <label> Должность:
                    <select name='select' className='select' value={state.role}  required onChange={(e) => setState({...state, role: e.target.value})}>
                        <option name='role' value="waiter">Официант</option>
                        <option name='role' value="cook">Повар</option> 
                        <option name='role' value="driver">Водитель</option>
                    </select>
                </label>
                <label style={{marginRight: '0'}}>В архиве
                <input className='checked' type="checkbox" name="isArchive" checked={state.isArchive} onChange={() => setState({...state, isArchive: !state.isArchive }) }/>
                </label>
                
            <button className='btn' type='button' onClick={(e) => clear(e)}>Очистить</button>
            {
                !active ? <button className='btn' type='submit'> Добавить </button> :
                <button className='btn' type='submit'> Изменить </button>
            }
            </fieldset> 
        </form> 
        </>
    )
}
export default AddAndChangeEmployee