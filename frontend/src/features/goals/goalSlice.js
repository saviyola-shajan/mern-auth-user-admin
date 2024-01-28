import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'


const initialState={
    goals:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const goalsSlice=createSlice({
    name:'goal',
    initialState,
    reducers:{
        reset:(state)=>initialState
    }
})

export const {reset}=goalsSlice.reducer
export default goalsSlice.reducer