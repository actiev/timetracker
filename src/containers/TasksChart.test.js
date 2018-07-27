import React from 'react'
import { shallow, mount } from 'enzyme'
import TasksChart  from './TasksChart'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

configure({ adapter: new Adapter() })

const mockStore = configureStore()

describe('test chart', () => {
  let wrapper, store

  beforeEach(() => {
    const initialState = {
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
          spend: {
            hours: 1,
            minutes: 0,
            seconds: 10
          }
        }]
    }
    store = mockStore(initialState)

    wrapper = shallow(
      <TasksChart store={store} />
    )
  })

  it('function generate', () => {
    // const button = wrapper.find('button').at(0)
    //
    // button.simulate('click')

    expect(wrapper).toMatchSnapshot()
  })

})
