import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// export const getQuestionsByQuiz = createAsyncThunk('quiz/getQuestions',
//   async () =>{
//     const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/questions`);
//     if (!response.ok) throw new Error('Error fetching questions');
//     const data = await response.json();
//     console.log(data)
//     return data;
//   })

  // Returns a json with a list of ids and random quiz with their questions and options
export const getQuizUnOrderQuestions = createAsyncThunk('quiz/getQuestionsUnOrder',
  async (idQ) =>{
    const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/uib/PEBquiz/questions/listByQuiz/?quiz=${idQ}`);
    if (!response.ok) throw new Error('Error fetching questions');
    const data = await response.json();
    console.log(data)
    return data;
  })


// Slice
export const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    questions_done: [],
    currentQuestion: null,
    currentQuestionIndex: 0,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length){
        state.currentQuestionIndex += 1;
        
        question_doned = state.questions.shift();
        state.questions_done.append(question_doned);
        
        state.currentQuestion=state.questions[0]
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getQuestionsByQuiz.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(getQuestionsByQuiz.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.questions = action.payload;
      // })
      // .addCase(getQuestionsByQuiz.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // })
      .addCase(getQuizUnOrderQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getQuizUnOrderQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(getQuizUnOrderQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export actions
export const { nextQuestion } = questionSlice.actions;

export default questionSlice.reducer
