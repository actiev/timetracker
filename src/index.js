import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { routerReducer } from 'react-router-redux'
import { BrowserRouter as Router} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import rootReducer from './reducers/index'
import './assets/App.css'
import routes from './router/index'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  combineReducers({
    initialState: rootReducer,
    routing: routerReducer
  }),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {renderRoutes(routes)}
    </Router>
  </Provider>,
  document.getElementById('root')
)
