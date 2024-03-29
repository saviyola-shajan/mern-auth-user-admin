import axios from 'axios'

const API_URL = '/api/users/'

//register user
const register= async(userData)=>{
    const response= await axios.post(API_URL,userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
//login user
const login= async(userData)=>{
    const response= await axios.post(API_URL+'login',userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
//profile upload
const profileUpload=async(token,url)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const liveUser= JSON.parse(localStorage.getItem('user'))
    const response=await axios.post(API_URL+'profile/upload',{url,liveUser},config)
    return response.data
}



//logout user
const logout =()=>{
    localStorage.removeItem('user')
}

const authService={
    register,
    logout,
    login,
    profileUpload
}
export default authService