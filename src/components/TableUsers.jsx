/* eslint-disable no-unused-expressions */
import React from 'react'
import { deleteUser } from '../redux/actionsCreators/actions';
import { useSelector, useDispatch } from 'react-redux'
import SortPopup from './SortPopup';
import FilterPopup from './FilterPopup';
import { useNavigate } from 'react-router-dom'
import { setActiveEmployee } from '../redux/actionsCreators/actions';

function TableUsers() {
    const glossary = new Map ([ ['driver', 'Водитель'], ['waiter', 'Официант'], ['cook', 'Повар'] ])
    const headers = ['Имя', 'Дата рождения', 'Должность', 'Номер телефона']

    const dispatch = useDispatch()
    const history = useNavigate();
    const dataBase = useSelector(({usersInfo}) => usersInfo.users)

    const userDetails = (id) => {
        const needEmployee = dataBase.find(user => user.id === id)
        dispatch(setActiveEmployee(needEmployee))
        history("/addUser")
    }
     
    const removeUser = (id) => window.confirm('Вы действительно хотите удалить?') && dispatch(deleteUser(id))

    return (
    <div className='container'>
        <div className='panel-devtools'>
            <div className='panel-devtools__container'>
            <SortPopup users={dataBase}/> 
            <FilterPopup /> 
            <button className='btn' onClick={() => history("/addUser")}>Добавить</button>
            </div>
        </div>

    <table className='table'>
        <thead cellPadding={0} cellSpacing={0}>
        <tr>{dataBase && headers.map((header, i) => <th key={i}>{header}</th>)}</tr>
        </thead>

        <tbody>
         {dataBase.map((user, index) => (   
            <tr key={user.id + user.name}>
              <td>
                  {user.name}</td>
              <td className='birthday'>{user.birthday}
                  <button className='details' onClick={()=> userDetails(user.id)}>Инфо</button>
              </td> 
              <td>{glossary.get(user.role)}</td> 
              <td className='td'> {user.phone} <button className="rm" onClick={() => removeUser(user.id)}>&times;</button> </td> 
            </tr>
            )
          )}
        </tbody>
    </table>
    </div>
  )
}

export default TableUsers
