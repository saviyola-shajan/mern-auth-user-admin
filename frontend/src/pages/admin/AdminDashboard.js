import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserList from '../../Components/userList'
import {getAllUsers,searchUser,reset} from '../../features/adminAuth/adminAuthSlice'

function AdminDashboard() {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const {admin,isLoading,isError,isSuccess,message}=useSelector((state)=>state.adminAuth)
  const [searchQuery,setsearchQuery]=useState('')

  useEffect(()=>{
    if(!admin){
      navigate('/admin/login')
      return;
    }
    if(searchQuery){
      dispatch(searchUser(searchQuery))
    }else{
      dispatch(getAllUsers)
    }
    return()=>{
      dispatch(reset())
    }
  },[dispatch,admin,navigate,searchQuery])


  const handleSearchchange=(e)=>{
e.preventDefault()
setsearchQuery(e.target.value)
  }
  if(!admin){
    return null;
  }


  return (
    <div>
    <h1>Admin Dashboard</h1>
    {isLoading&&<p>Loading...</p>}
    {isSuccess&&<p>Users loaded sucessfully!</p>}
    {isError&&<p>Error:{message}</p>}
    <div className='form-group'>
      <input 
      type='text'
      placeholder='Search User'
      className='form-control'
      value={searchQuery}
      onChange={handleSearchchange}/>
    </div>
    <UserList/>
    </div>
  )
}

export default AdminDashboard