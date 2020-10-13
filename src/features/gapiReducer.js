import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    client: null,
    gauth: null,
    user: null
}

const gapiSlice = createSlice({
    name: 'gapi',
    initialState,
    reducers: {
        gapiUpdate(state, action) {
            let gapi = action.payload
            console.log(gapi)
        }
    }
})

export const { gapiUpdate } = gapiSlice.actions

export default gapiSlice.reducer