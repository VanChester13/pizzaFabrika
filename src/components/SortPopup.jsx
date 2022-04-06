/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { changeOrder } from '../redux/actionsCreators/actions'

function SortPopup({users}) {
    const [sortConfig, setSortConfig] = React.useState({name: {Key: null, direction: 'asc'}, birthday: {Кey: null, direction: null}})
    const nameHeaderSort = {name: {value: 'По имени'}, birthday: {value: 'По дате'}}

    const [sort, setSort] = React.useState('name')
    console.log(sort)
    const dispatch = useDispatch() 
    const initialEmployees = useSelector(({usersInfo}) => usersInfo.initialEmployees)
    
    React.useEffect(() =>  {
        const arrUsers = [...users]
        switch(sort) {
            case 'name' : 
            arrUsers.sort((a, b) => {
                    if (a[sort] < b[sort]) {
                        return sortConfig[sort].direction === 'asc' ? -1 : 1;
                    }
                    if (a[sort] > b[sort]) {
                        return sortConfig[sort].direction === 'asc' ? 1 : -1;
                    }
                    return 0;  
                })
            break

            case 'birthday' :
                arrUsers.sort((a, b) => {
                    if (sortConfig[sort].direction === 'asc') {
                        return moment(a.birthday, 'DDMMYYYY') - moment(b.birthday, 'DDMMYYYY')
                    }
                    if (sortConfig[sort].direction === 'desc') {
                        return moment(b.birthday, 'DDMMYYYY') - moment(a.birthday, 'DDMMYYYY')
                    }
                    return arrUsers
                })
            break 
        } 
        sortConfig[sort].direction ? dispatch(changeOrder(arrUsers)) : dispatch(changeOrder(initialEmployees)) 
    }, [sortConfig])

    return (
        <div className="sort-popup btn"> Сортировка
            <ul className='sort-popup__sub-menu'>
                {
                Object.keys(nameHeaderSort).map((key, i) => (
                    <li key={i} onClick={() => {
                        let val = sortConfig[key].direction
                        setSortConfig({...sortConfig,
                            [key]: {Key: key, direction: val === null  ? 'asc' : val === 'asc' ? 'desc' : val === 'desc' ? null : null} })
                        setSort(key) 
                    }}> 
                        {nameHeaderSort[key].value}
                        <span>{sortConfig[key].direction === 'desc' ?  '🔽' : sortConfig[key].direction === 'asc' ?  '🔼'  : '' }</span>
                    </li>  
                  ))
               }
           </ul>  
        </div>
       ) 
    }

export default SortPopup
