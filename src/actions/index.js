export const addTask = task => ({
  type: 'ADD_TASK',
  task
})

export const removeTask = id => ({
  type: 'REMOVE_TASK',
  id
})

export const removeTasks = () => ({
  type: 'REMOVE_TASKS'
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

export const setEndTime = endTime => ({
  type: 'SET_END_TIME',
  endTime
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

export const toggleTabs = () => ({
  type: 'TOGGLE_TABS'
})

export const getInfo = id => ({
  type: 'GET_INFO',
  id
})