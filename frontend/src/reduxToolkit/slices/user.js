import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const createUser = createAsyncThunk('user/createUser',

    async (dataUser, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/uib/PEBquiz/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataUser)
      });
      console.log(response)
      if (!response.ok) throw new Error('Error fetching creando usuario');
      const data = await response.json();
      return data; 
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const userSlice = createSlice({
    name :'user',
    initialState : {
        currentUser : null        
    },
    reducers :{

    },
    extraReducers: (builder) =>{
        builder
              .addCase(createUser.pending, (state) => {
                state.statusQRandom = 'loading';
              })
              .addCase(createUser.fulfilled, (state, action) => {
                state.statusQRandom = 'succeeded';
                state.currentQuiz = action.payload.quiz;
                state.currentQuizIndex = action.payload.quiz['idQ']
                state.quiz_ids = action.payload.ids
              })
              .addCase(createUser.rejected, (state, action) => {
                state.statusQRandom = 'failed';
                state.errorQRandom = action.error.message;
              });
    }
})

// export {} i don't have actions.

export default userSlice.reducer