import React from 'react';
import styled from 'styled-components';
import Post from './components/Post/Post.js';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

class App extends React.Component {
  render() {
    return (
      <MainContainer>
        <Post
          nomeUsuario={'Paulinha'}
          fotoUsuario={'https://picsum.photos/50/50'}
          fotoPost={'https://picsum.photos/200/150'}
        />

        <Post
          nomeUsuario={'Samuel'}
          fotoUsuario={'https://picsum.photos/30/30'}
          fotoPost={'https://picsum.photos/300/200'}
        />

        <Post
          nomeUsuario={'Victoria'}
          fotoUsuario={'https://picsum.photos/40/40'}
          fotoPost={'https://picsum.photos/400/300'}
        />
      </MainContainer>
    );
  }
}


export default App;
