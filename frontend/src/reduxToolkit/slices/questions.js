import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { api } from '../../api/api';

// Returns a json with a list of ids and random quiz with their questions and options
export const getQuizUnOrderQuestions = createAsyncThunk('quiz/getQuestionsUnOrder',
  async (idQ) =>{
    parseInt(idQ)
    const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/uib/PEBquiz/questions/listByQuiz/?quiz=${idQ}`);
    if (!response.ok) throw new Error('Error fetching questions');
    const data = await response.json();
    // console.log(data)
    return data;
  })

// // Returns a json with a list of ids and random quiz with their questions and options
// export const getQuizUnOrderQuestions = createAsyncThunk(
//   'quiz/getQuestionsUnOrder',
//   async (idQ, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/uib/PEBquiz/questions/listByQuiz/?quiz=${idQ}/`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || `Error fecthing unorder questions form quiz ${idQ}. Error: ${error.message}`)
//     }
//   })



// Slice
export const questionSlice = createSlice({
  name: 'questionSlice',
  initialState: {
    questions: [],
    // questions_done: [],
    currentQuestion: null,
    currentQuestionIndex: 0,
    currentOption: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;

        // shift retunrs the first object of the array and modify others positions
        state.currentQuestion = state.questions[state.currentQuestionIndex]
      }else{
        // currentQuestionIndex now is equal to questions.lenght 
        // and reference any questions
        state.currentQuestionIndex += 1
        state.currentQuestion = null
      }
    },
    setOption(state){
      // action.payload is option value passed to action dispatch funtion
      state.currentOption = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizUnOrderQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getQuizUnOrderQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload.questions;
        state.currentQuestion = state.questions[0];
        state.currentQuestionIndex = 0;
      })
      .addCase(getQuizUnOrderQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export actions
export const { nextQuestion, setOption} = questionSlice.actions;

// export the reducer
export default questionSlice.reducer
