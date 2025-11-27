// postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();
//   return data;  // Este será el nuevo valor de posts
// });

export const fetchPosts = createAsyncThunk('quiz/getQuestionsUnOrder',
  async (idQ) =>{
    parseInt(idQ)
    const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/uib/PEBquiz/questions/listByQuiz/?quiz=${idQ}`);
    if (!response.ok) throw new Error('Error fetching questions');
    const data = await response.json();
    // console.log(data)
    return data;
  })

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [], // El estado inicial es un array vacío
    status: 'idle', // Estado de la petición (loading, succeeded, failed)
    error: null, // Error en caso de fallo
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'; // Cambia el estado a "cargando"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Cambia el estado a "exitoso"
        state.posts = action.payload; // Aquí es donde los posts cambian
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'; // Cambia el estado a "fallido"
        state.error = action.error.message; // Guarda el error
      });
  },
});

export default postsSlice.reducer;