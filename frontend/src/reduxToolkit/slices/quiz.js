import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { api } from "../../api/api";

// Returns a json with a list of ids and random quiz with their questions and options
export const getQuizRandomAndList = createAsyncThunk(
  "quiz/getQuizRandomAndList",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_API_URL}/uib/PEBquiz/quiz/`
    );
    if (!response.ok) throw new Error("Error fetching quiz, we don't have any questions");
    const data = await response.json();
    return data;
  }
);

// export const getQuizRandomAndList = createAsyncThunk(
//   "quiz/getQuizRandomAndList",
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
    nextQuiz: (state) => {
      if (state.quiz_ids.length > 0) {
        state.currentQuiz = action.payload.quiz;
        state.currentQuizIndex +=1;
        state.quiz_ids = action.payload.ids;
      }else{
        state.currentQuizIndex = null
        state.quiz_ids = []
        state.currentQuiz= null
      }
    },
    getQuiz:(state) =>{
        state.currentQuiz = action.payload.quiz;
        state.currentQuizIndex = action.payload.quiz["idQ"];
        state.quiz_ids = action.payload.ids;
    },
    initChecks: (state, action) => {
      state.checkedList = action.payload;
    },
    toogleCheck: (state, action) => {
      const index = action.payload;
      state.checkedList[index] = !state.checkedList[index];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizRandomAndList.pending, (state) => {
        state.statusQRandom = "loading";
      })
      .addCase(getQuizRandomAndList.fulfilled, (state, action) => {
        state.statusQRandom = "succeeded";
        state.currentQuiz = action.payload.quiz;
        state.currentQuizIndex = action.payload.quiz["idQ"];
        state.quiz_ids = action.payload.ids;
      })
      .addCase(getQuizRandomAndList.rejected, (state, action) => {
        state.statusQRandom = "failed";
        state.errorQRandom = action.error.message;
      });
  },
});

// export actions
export const { nextQuiz, initChecks, toogleCheck } = quizSlice.actions;

export default quizSlice.reducer;
