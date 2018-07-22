export const toggleTabs = () => ({
  type: 'TOGGLE_TABS'
})

export const removeTask = id => ({
  type: 'REMOVE_TASK',
  id
})

export const getInfo = id => ({
  type: 'GET_INFO',
  id
})