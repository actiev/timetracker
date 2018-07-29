const initialState = {
  taskTitle: '',
  startTime: null,
  endTime: null,
  timer: null,
  tasks: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: state.tasks.concat(action.task)
      }
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(item => item.id !== action.id)
      }
    case 'REMOVE_TASKS':
      return {...state, tasks: []}
    case 'ADD_TASKS':
      return {...state, tasks: action.tasks}
    case 'SET_TIMER':
      return {...state, timer: action.timer}
    case 'SET_TIMER_ID':
      return {...state, timerId: action.id}
    case 'SET_END_TIME':
      return {...state, endTime: action.endTime}
    case 'PUSH_TIME_LOCAL_STORAGE':
      return {...state, startTime: action.time}
    case 'SET_TASK_TITLE':
      return {...state, taskTitle: action.title}
    case 'RESET':
      return {
        ...state,
        timer: null,
        startTime: null,
        endTime: null,
        taskTitle: ''
      }
    default:
      return state
  }
}
