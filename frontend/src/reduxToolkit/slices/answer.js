import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'

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

export const sendAnswers = createAsyncThunk('answer/setAnswers',
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

        } catch (error) {
            return rejectWithValue(error.response?.data || `Error setting answers ${err.message}`);
        }
    }
);

export const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        results:[],
        answers: [],
        currentAnswer: null,
        responseTime: 0,
        statusAnswer: 'idle',
        error: null
    },
    reducers: {
        setAnswer(state, action) {
            // action.payload it will be a Json object time, optionSelect, questionId, userId
            state.currentAnswer = action.payload
            
            if (state.currentAnswer) {    
                state.answers.push(action.payload);
                state.responseTime = 0;
            }
        },
        setTime(state, action){
            console.log(`setTime_val: ${action.payload}`)
            state.responseTime = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendAnswers.pending, (state) => {
                state.statusAnswer = 'loading'
            })
            .addCase(sendAnswers.fulfilled, (state, action) => {
                state.statusAnswer = 'succeed';
                state.results = action.payload
            })
            .addCase(sendAnswers.rejected, (state, action) => {
                state.statusAnswer = 'failed';
                state.error = action.error.message
            })
    }
})

// export actions
export const {setAnswer, setTime} = answerSlice.actions;

export default answerSlice.reducer