import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { api } from '../../api/api';

export const sendAnswers = createAsyncThunk('answer/sendAnswers',
    async (answers, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/uib/PEBquiz/options/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(answers)
            });
            if (!response.ok) throw new Error("Error post answers, answers not will be saved");
            const data = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// export const sendAnswers = createAsyncThunk('answer/sendAnswers',
//     async (answers, { rejectWithValue }) => {
//         try {
//             const response = await api.post(
//                 '/uib/PEBquiz/answer/',
//                 answers, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 // body: JSON.stringify(answers)
//             });
//             console.log(response)
//             return (response.data)

//         } catch (error) {
//             return rejectWithValue(error.response?.data || `Error setting answers ${err.message}`);
//         }
//     }
// );

export const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        results: [],
        answers: [],
        currentAnswer: null,
        responseTime: 0,
        statusAnswer: 'idle',
        error: null,
        corrects:0,
        incorrects: 0,
        areas:[]
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
        setTime(state, action) {
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
                state.areas = action.payload.areas
                state.corrects = action.payload.num_correct
                state.incorrects = action.payload.num_incorrect
            })
            .addCase(sendAnswers.rejected, (state, action) => {
                state.statusAnswer = 'failed';
                state.error = action.error.message
            })
    }
})

// export actions
export const { setAnswer, setTime } = answerSlice.actions;

export default answerSlice.reducer