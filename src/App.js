/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Route, Routes } from 'react-router-dom'
import TableUsers from "./components/TableUsers";
import Loader from './components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { dataBase } from "./employees";
import { setUsers } from "./redux/actionsCreators/actions";
import AddUser from "./components/AddAndChangeEmployee";

function App() {
  const isLoaded = useSelector(({usersInfo}) => usersInfo.loading)
  const dispatch = useDispatch()
  const users = React.useMemo(() => dispatch(setUsers(dataBase)), [])

  return (
    <div className="wrapper-outer"> 
          <Routes>  
              <Route path="/"  element={!isLoaded  ? <Loader/> : <TableUsers/>}/>
              <Route path="/addUser" element={ <AddUser users={users}/> }></Route>
          </Routes> 
      </div>
  );
}
export default App;
