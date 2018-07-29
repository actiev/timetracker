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

export const setRandomTasks = tasks => ({
  type: 'ADD_TASKS',
  tasks
})

export const openModal = () => ({
  type: 'OPEN_MODAL'
})

export const toggleButtons = () => ({
  type: 'TOGGLE_BUTTONS'
})

export const start = title => ({
  type: 'START',
  title
})

export const refreshTimer = () => ({
  type: 'REFRESH_TIMER'
})

export const pushTimeLocalStorage = time => ({
  type: 'PUSH_TIME_LOCAL_STORAGE',
  time
})

export const setEndTime = endTime => ({
  type: 'SET_END_TIME',
  endTime
})

export const setTitle = title => ({
  type: 'SET_TITLE',
  title
})

export const setTaskTitle = title => ({
  type: 'SET_TASK_TITLE',
  title
})

export const setTimer = timer => ({
  type: 'SET_TIMER',
  timer
})

export const setTimerId = id => ({
  type: 'SET_TIMER_ID',
  id
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