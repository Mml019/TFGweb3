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

        } catch (error) {
            return rejectWithValue(error.response?.data || `Error setting answers ${err.message}`);
        }
    }
);

export const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        answers: [],
        currentAnswer: null,
        responseTime: 0,
        statusAnswer: 'idle'
    },
    reducers: {
        sendResponse(state) {
            // action.payload it will be a ditionary time, optionSelect, questionId, userId
            
                currentAnswer = {
                    question: action.payload.questionId,
                    user: action.payload.userId,
                    time: state.responseTime
                }
                console.log(currentAnswer);
            if (currentAnswer !== null || currentAnswer !== undefined) {    
                state.answers.push(currentAnswer);
            }
        },
        setTime(state){
            state.time = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setAnswers.pending, (state) => {
                state.statusAnswer = 'loading'
            })
            .addCase(setAnswers.fulfilled, (state, action) => {
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
export const {sendResponse, setTime} = answerSlice.actions;

export default answerSlice.reducer