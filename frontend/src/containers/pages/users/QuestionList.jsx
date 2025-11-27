import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../reduxToolkit/slices/posts';
import { getQuizRandomAndList } from '../../../reduxToolkit/slices/quiz';
import { getQuizUnOrderQuestions } from '../../../reduxToolkit/slices/questions';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts); // Accede al estado global de Redux
  const { quiz_ids, currentQuiz, currentQuizIndex, statusQRandom, errorQRandom, checkedList } = useSelector((state) => state.quiz) 
  
  const fetchQuestions = () =>{
    dispatch(getQuizRandomAndList()).unwrap().then( data => {
      dispatch(getQuizUnOrderQuestions(data.quiz.idQ))
    })
    
  }
  console.log(useSelector((state) => state.quiz))

  useEffect(() => {
      fetchQuestions()
  }, []);

  // Si el estado de posts está vacío, mostramos un mensaje
  if (posts.length === 0 && status !== 'loading') {
    return <div>No hay posts disponibles.</div>;
  }

  // Si está cargando, mostramos un mensaje de carga
  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  // Si la petición falló, mostramos el error
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  console.log(posts)
  // Cuando tenemos los posts, los mostramos
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.questions.map((post) => (
        
          <li key={post.idP}>{post.statement}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;