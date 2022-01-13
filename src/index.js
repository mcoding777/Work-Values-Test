import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter,
} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

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
    default:
      return state
  }
}

let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
