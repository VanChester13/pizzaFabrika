const initialState = {
    users: [],
    initialEmployees: [],
    loading: false,
    activeEmployee: null
}

const loadDatReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USERS': 
            return {...state, users: action.payload, initialEmployees: action.payload }

        case 'SET_IS_LOADED': 
            return {...state, loading: action.payload}


        case 'CHANGE_ORDER' :
            return {...state, users: action.payload }


        case 'SET_FILTER_OF_ROLE' : {
            const newArr = state.initialEmployees.filter(item => item.role === action.payload.toString())
            return {...state, users: newArr}
        }
        
        case 'SET_CHECK_ARCRHIVE' : {
            const newArr = state.initialEmployees.filter(item => item.isArchive === action.payload)
            return {...state, users: newArr} 
        }
            

        case 'SET_ACTIVE_EMPLOYEE' : 
            return {...state, activeEmployee: action.payload}


        case 'CHANGE_INFO' : {
            const index = state.users.findIndex((item) => item.id === action.payload.id)
            const newArr = [...state.users.slice(0, index), action.payload, ...state.users.slice(index + 1)];
            return {...state, users: newArr, initialEmployees: newArr, activeEmployee: null}
        }

        case 'ADD_USER' : {
            //const newUsers = state.users.concat({id: state.users.length + 1, ...action.payload})
            const newUsers = state.users.concat({id: '', ...action.payload}).map((user, i) => {
                user.id = i + 1
                return user
             }) 
            return {...state, users: newUsers, initialEmployees: newUsers}
        }

        case 'DELETE_USER' : {
            const newArr =  state.users.filter(user => user.id !== action.payload).map((user, i) => {
                user.id = i + 1
                return user
             }) 
         return {...state, users: newArr, initialEmployees: newArr}
            }

         case 'DELETE_COMPLETED_EMPLOYEE' : {
             const newArr = action.payload.map((user, i) => {
                user.id = i + 1
                return user
          }) 
             return {...state, users: newArr, initialEmployees: newArr}
         }
        
        
        default: return state
    }
}

export default loadDatReducer

