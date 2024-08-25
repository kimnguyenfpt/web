import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('auth/login', async (userData) => {
    const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return response.json();
});

const authLoginSlice = createSlice({
    name: 'authLogin',
    initialState: {
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
            sessionStorage.removeItem('user'); 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
                sessionStorage.setItem('user', JSON.stringify(action.payload)); 
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = authLoginSlice.actions;
export default authLoginSlice.reducer;
