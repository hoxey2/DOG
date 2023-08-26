// 사용하는 부분에서는 dispatch로 타입만 불러오면 실행
import './App.css';
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Layout } from './layouts/Layout';

import React from 'react';


export const GlobalStyle = createGlobalStyle`
  ${reset}
  h1 {
    font-size: 3.5rem;
    padding: 0.5rem 0;
    font-weight: bold;
  }
  h2 {
    font-size: 3rem;
    padding: 0.5rem 0;
    font-weight: 500;
  }
  h3 {
    font-size: 2.5rem;
    padding: 0.5rem 0;
  }
  h4 {
    font-size: 2rem;
    padding: 0.5rem 0;
  }
  h5 {
    font-size: 1.5rem;
    padding: 0.5rem 0;
  }
  h6 {
    font-size: 1rem;
    padding: 0.5rem 0;
  }
  p{
    padding: 1.5rem 0;
  }
  ul{
    list-style: square;
  }
  ol{
    list-style: decimal-leading-zero;
  }
  li{
    font-size: 1.3rem;
    padding: 1rem;
    margin-left: 2.5rem;
  }
`

const App = () => {
  return (
    <div className="App">
      <React.Fragment>
        <GlobalStyle />
        <Layout />
      </React.Fragment>
    </div>
  );
}

export default App;