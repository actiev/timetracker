const initialState = {
  buttons: true,
  taskTitle: '',
  openModal: false,
  handle: false,
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
    case 'START':
      return {...state, buttons: !state.buttons}
    case 'SET_END_TIME':
      return {...state, endTime: action.endTime}
    case 'SET_TASK_TITLE':
      return {...state, taskTitle: action.title}
    case 'RESET':
      return {
        ...state,
        buttons: !state.buttons,
        timer: null,
        startTime: 0,
        taskTitle: ''
      }
    case 'TOGGLE_BUTTONS':
      return {...state, buttons: !state.buttons}
    case 'TOGGLE_TABS':
      return {...state, handle: !state.handle}
    case 'OPEN_MODAL':
      return {...state, openModal: !state.openModal}
    case 'PUSH_TIME_LOCAL_STORAGE':
      console.log(action)
      return {...state, startTime: action.time}
    default:
      return state
  }
}
