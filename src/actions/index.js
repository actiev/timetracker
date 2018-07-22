export const addTask = task => ({
  type: 'ADD_TASK',
  task
})

export const openModal = () => ({
  type: 'OPEN_MODAL'
})

export const toggleButtons = () => ({
  type: 'TOGGLE_BUTTONS'
})

export const setStartTime = startTime => ({
  type: 'SET_START_TIME',
  startTime
})

export const setTaskTitle = title => ({
  type: 'SET_TASK_TITLE',
  title
})

export const setTimer = timer => ({
  type: 'SET_TIMER',
  timer
})

export const reset = () => ({
  type: 'RESET'
})
