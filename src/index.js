import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import TaskList from './containers/TaskList'
import './assets/App.css'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <TaskList />
  </Provider>,
  document.getElementById('root')
)
