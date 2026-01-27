import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { api } from "../../api/api";

// Returns a json with a list of object quiz (allQuiz()) with their questions
export const getQuizzesRandom = createAsyncThunk(
  "quiz/getQuizzesRandom",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/uib/PEBquiz/quiz/`
      );
      const data = await response.json();
      if (!response.ok){
        return rejectWithValue(`Error obteniendo cuestionarios. ${data.error}`);
      } 
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// export const getQuizzesRandom = createAsyncThunk(
//   "quiz/getQuizzesRandom",
//   async (_, {rejectWithValue}) => {
//     try {
//       console.log('hola')
//       const response = await api.get(
//       '/uib/PEBquiz/quiz/'
//     );
//     //if (!response.ok) throw new Error("Error fetching questions");
//     console.log(response.data);
//     return response.data;
//     } catch (error) {
//       // this error it would be trated in action
//       return rejectWithValue(error.response?.data || `Error fetching questions: ${error.message}`)
//     }
//   }
// );

// Slice
const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quiz_ids: [],
    currentQuiz: null,
    currentQuizIndex: 0,
    statusQRandom: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    errorQRandom: null,
    checkedList: [],
  },
  reducers: {
    getQuiz: (state) => {
      state.currentQuiz = action.payload.quiz;
      state.currentQuizIndex = action.payload.quiz["idQ"];
      state.quiz_ids = action.payload.ids;
    },
    nextQuiz: (state) => {
      if (state.currentQuizIndex < state.quiz_ids.length - 1) {
        state.currentQuizIndex += 1
        state.currentQuiz = state.quiz_ids[state.currentQuizIndex]
      } else {
        state.currentQuizIndex = -1
        state.currentQuiz = null
        state.quiz_ids = []
      }
    },
    initChecks: (state, action) => {
      state.checkedList = action.payload;
    },
    toogleCheck: (state, action) => {
      const index = action.payload;
      state.checkedList[index] = !state.checkedList[index];
    },
    resetQuiz(state) {
      state.quiz_ids = []
      state.currentQuiz = null
      state.currentQuizIndex = 0
      state.statusQRandom = 'idle'
      state.errorQRandom = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizzesRandom.pending, (state) => {
        state.statusQRandom = "loading";
      })
      .addCase(getQuizzesRandom.fulfilled, (state, action) => {
        state.statusQRandom = "succeeded";
        // state.currentQuizIndex = action.payload.quizzes[0].idQ;
        state.currentQuizIndex = 0;
        state.currentQuiz = action.payload.quizzes[state.currentQuizIndex];
        state.quiz_ids = action.payload.quizzes;
      })
      .addCase(getQuizzesRandom.rejected, (state, action) => {
        state.statusQRandom = "failed";
        state.errorQRandom = action.payload || action.error.message;
      });
  },
});

// export actions
export const { nextQuiz, initChecks, toogleCheck } = quizSlice.actions;

export default quizSlice.reducer;
