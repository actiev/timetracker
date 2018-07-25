import Tasks from '../containers/Tasks'
import TaskInfo from '../containers/TaskInfo'
import Page404 from '../components/Page404'

const routes = [
  {
    path: '/',
    component: Tasks,
    exact: true
  },
  {
    path: '/charts',
    component: Tasks
  },
  {
    path: '/tasks/:id(\\d+)',
    component: TaskInfo
  },
  {
    path: '*',
    component: Page404
  }
]

export default routes
