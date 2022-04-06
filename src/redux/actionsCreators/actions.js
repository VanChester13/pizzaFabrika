const isLoaded = (bool) =>  (dispatch) => dispatch({ type: 'SET_IS_LOADED', payload: bool })

export const setUsers = (dataBase) => (dispatch) => {
    setTimeout(() => {
        dispatch({type: 'SET_USERS', payload: dataBase }) 
        dispatch(isLoaded(true))
    }, 2000)
}

export const deleteUser = (id) => (dispatch) => dispatch({type: 'DELETE_USER', payload: id})

export const addUser = (obj) => (dispatch) =>  dispatch({type: 'ADD_USER', payload: obj})

export const changeOrder = (users) => (dispatch) => dispatch({type: 'CHANGE_ORDER', payload: users })

export const filterOfRole = (role) => (dispatch) => dispatch({type: 'SET_FILTER_OF_ROLE', payload: role}) 

export const checkArchive = (flag) => (dispatch) => dispatch({type: 'SET_CHECK_ARCRHIVE', payload: flag} )

export const setActiveEmployee = (employee) => (dispatch) => dispatch({type: 'SET_ACTIVE_EMPLOYEE', payload: employee})

export const changeInfo = (employee) => (dispatch) => dispatch({type: 'CHANGE_INFO', payload: employee})

export const deleteCompletedEmployee = (employees) => (dispatch) => dispatch(({type: 'DELETE_COMPLETED_EMPLOYEE', payload: employees}))