import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../api/api';

// export const createUser = createAsyncThunk('user/createUser',
//   async (dataUser, { rejectWithValue }) => {
//     try {
//       const response = await api.post('/uib/PEBquiz/user/', 
//         dataUser,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(dataUser)
//         });
//       console.log(response.data);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

export const createUser = createAsyncThunk('user/createUser',
    async (dataUser, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/uib/PEBquiz/user/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataUser)
      });
      const data = await response.json();
      return data; 
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    statusUser: 'idle',
    errorUser: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.statusUser = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.statusUser = 'succeeded';
        state.currentUser = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.statusUser = 'failed';
        state.errorUser = action.error.message;
      });
  }
})

// export {} i don't have actions.

export default userSlice.reducer