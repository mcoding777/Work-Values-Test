import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter,
} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자도구

// 상태 초기화
const initialState = {
  user_name: "",
  user_gender: "",
  user_select: {},
};

// 리듀서 정의
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_USERINFO':
      return {
        ...state, 
        user_name: action.name,
        user_gender: action.gender, 
      };
    case 'CHANGE_USERSELECT':
      return {
        ...state, 
        user_select: {...state.user_select, ...action.select},
      };
    default:
      return state
  }
}

let store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
