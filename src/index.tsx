import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Global, css } from '@emotion/react'
import { Provider } from 'react-redux'
import store from './redux/store'
import 'chart.js/auto'

const global = css`
  :root {
    --blue: #07f;
    --gray: #a1a1a1;
    --red: #f62459;
    --black: #1f334a;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    overflow-x: hidden;
    letter-spacing: -1px;
  }

  body {
    font-size: 1.6rem;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    background-color: #fafafa;
    color: var(--black);
  }

  a {
    text-decoration: none;
    color: black;
  }
  ul {
    list-style-type: none;
  }
  img {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  button {
    border: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
  input {
    outline: none;
    padding: 0 1.5rem;
    &:focus::placeholder {
      color: transparent;
    }
  }

  .btn {
    background-color: var(--sky);
    color: var(--primary);
    padding: 0.5rem 2.5rem;
    font-size: 2rem;
    font-weight: bold;
    border-radius: 2rem;
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Global styles={global} />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
