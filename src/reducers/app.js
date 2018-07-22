const initialState = {
  stopBtn: true,
  startBtn: false,
  timer: null,
  taskTitle: '',
  openModal: false,
  handle: true,
  tasks: []
}

export default function (state = initialState, action) {
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
    case 'SET_TIMER':
      return {...state, timer: action.timer}
    case 'SET_START_TIME':
      return {...state, startTime: action.startTime}
    case 'SET_TASK_TITLE':
      return {...state, taskTitle: action.title}
    case 'RESET':
      console.log({...state})
      return {
        ...state,
        stopBtn: !state.stopBtn,
        startBtn: !state.startBtn,
        timer: null,
        taskTitle: ''
      }
    case 'TOGGLE_BUTTONS':
      return {
        ...state,
        stopBtn: !state.stopBtn,
        startBtn: !state.startBtn
      }
    case 'TOGGLE_TABS':
      return {...state, handle: !state.handle}
    case 'OPEN_MODAL':
      return {...state, openModal: !state.openModal}
    default:
      return state
  }
}
