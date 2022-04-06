/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterOfRole } from '../redux/actionsCreators/actions'
import { checkArchive } from '../redux/actionsCreators/actions'
import { changeOrder } from '../redux/actionsCreators/actions'

function FilterPopup() {
  const [checkFlag, setCheckFlag] = React.useState('')  
  const dispatch = useDispatch() 
  const initialEmployees = useSelector(({usersInfo}) => usersInfo.initialEmployees)
 
  React.useEffect(() =>  {checkFlag !== '' && dispatch(checkArchive(checkFlag))}, [checkFlag]) 

  return (
    <div className="filter-popup btn"> Фильтрация
        <ul  className='filter-popup__sub-menu'>
            <li data-role="waiter" onClick={(e) => dispatch(filterOfRole(e.target.dataset.role)) }> Официант </li>
            <li data-role="cook" onClick={(e) => dispatch(filterOfRole(e.target.dataset.role)) }> Повар </li> 
            <li data-role="driver" onClick={(e) => dispatch(filterOfRole(e.target.dataset.role))}> Водитель </li>
            <li>В архиве<input className='checked' type="checkbox" checked={checkFlag} onChange={() => setCheckFlag(!checkFlag)}/></li>
            <li onClick={() => dispatch(changeOrder(initialEmployees))}>Сброс</li>
        </ul>
    </div>
    
  )
}

export default FilterPopup