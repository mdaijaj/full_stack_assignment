import Errorpage from './error';
import {Route, Routes} from 'react-router-dom';
import HomePage from './home'
import UserList from './table';
import AddUser from './add_users'
import UpdateUser from './edit_user';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Routing=()=>{
  const [userdata, setUserdata]=useState([])


  const AllUserList = async () => {
    const response = await axios.get('/api/getuserList');
    let result = await response.data.data
    setUserdata(result)
  }

  
  useEffect(()=>{
    AllUserList()
  }, [])


  return(
    <>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />  
          <Route path="/error" element={<Errorpage/>} />
          <Route path="/userList" element={<UserList/>} />
          <Route path="/add_user" element={<AddUser/>} />
          <Route path="/user_details_update/:id" element={<UpdateUser/>} />
        </Routes>
    </>
    )
}


export default Routing;