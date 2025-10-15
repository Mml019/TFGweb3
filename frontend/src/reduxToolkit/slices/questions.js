import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const getQuestionsByQuiz = createAsyncThunk({
  
})
// Slice
const slice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    currentquestion: null,
    state: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state, action) =>  {
      state.user = null;
    },

  },
});

export default slice.reducer


// Actions
const { loginSuccess, logoutSuccess } = slice.actions
export const login = ({ username, password }) => async dispatch => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    dispatch(loginSuccess({username}));
  } catch (e) {
    return console.error(e.message);
  }
}
export const logout = () => async dispatch => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message);
  }
}