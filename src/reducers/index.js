const initialState = {
  buttons: true,
  taskTitle: '',
  openModal: false,
  handle: false,
  tickId: null,
  tasks: [
    {
      id: 1,
      start: {
        hours: 14,
        minutes: 30,
        seconds: 57
      },
      end: {
        hours: 16,
        minutes: 15,
        seconds: 47
      },
      title: 'task1',
      speed: {
        hours: 1,
        minutes: 0,
        seconds: 10
      }
    },
    {
      id: 2,
      start: {
        hours: 16,
        minutes: 15,
        seconds: 57
      },
      end: {
        hours: 17,
        minutes: 30,
        seconds: 47
      },
      title: 'task2',
      speed: {
        hours: 1,
        minutes: 0,
        seconds: 10
      }
    },
    {
      id: 3,
      start: {
        hours: 17,
        minutes: 30,
        seconds: 57
      },
      end: {
        hours: 22,
        minutes: 40,
        seconds: 47
      },
      title: 'task3',
      speed: {
        hours: 1,
        minutes: 0,
        seconds: 10
      }
    }
  ]
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
    case 'SET_TIMER':
      return {...state, timer: action.timer}
    case 'SET_START_TIME':
      return {...state, startTime: action.startTime}
    case 'SET_END_TIME':
      return {...state, endTime: action.endTime}
    case 'SET_TASK_TITLE':
      return {...state, taskTitle: action.title}
    case 'RESET':
      return {
        ...state,
        buttons: !state.buttons,
        timer: null,
        taskTitle: ''
      }
    case 'TOGGLE_BUTTONS':
      return {
        ...state,
        buttons: !state.buttons
      }
    case 'TOGGLE_TABS':
      return {...state, handle: !state.handle}
    case 'OPEN_MODAL':
      return {...state, openModal: !state.openModal}
    default:
      return state
  }
}
