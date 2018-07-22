import { combineReducers } from 'redux'
import taskReducers from './app'

export default combineReducers({
  app: taskReducers
})
