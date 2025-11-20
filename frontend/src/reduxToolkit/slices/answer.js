import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// export const setAnswers = createAsyncThunk('answer/setAnswers',
//     async (answers, { rejectWithValue }) => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/uib/PEBquiz/answer`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(answers)
//             });
//             const data = response.data
//             console.log(data)
//         } catch (err) {
//             return rejectWithValue(err.message);
//         }
//     }
// );

export const setAnswers = createAsyncThunk('answer/setAnswers',
    async (answers, { rejectWithValue }) => {
        try {
            const response = await api.post(
                '/uib/PEBquiz/answer',
                 answers, {
                // method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify(answers)
            });
            return (response.data)
            console.log(response.data)
        } catch (error) {
            return rejectWithValue( error.response?.data||`Error setting answers ${err.message}`);
        }
    }
);

export const answerSlice = createSlice({
    name: 'answer',
    initialState : {
        // respondantID : null,
        // answers : [],
        statusAnswer : 'idle'
    },
    reducers : {

    },
    extraReducers : (builder) => {
        builder
        .addCase(setAnswers.pending, (state) => {
            state.statusAnswer = 'loading'
        })
        .addCase(setAnswers.fulfilled, (state , action) => {
            state.statusAnswer = 'succeed';
            state.answers = action.payload
        })
        .addCase(setAnswers.rejected, (state, action) => {
            state.statusAnswer = 'failed';
            state.error = action.error.message 
        })
    }
})

// export actions

export default answerSlice.reducer