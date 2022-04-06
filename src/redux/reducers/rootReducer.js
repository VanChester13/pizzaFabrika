import { combineReducers } from 'redux'
import loadDataReducer from './loadDataReducer'

export const rootReducer = combineReducers({   
    usersInfo: loadDataReducer, 
})
