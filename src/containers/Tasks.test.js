import React from 'react'
import { shallow, configure } from 'enzyme'
import Tasks from './Tasks'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'

configure({ adapter: new Adapter(), disableLifecycleMethods: false })

describe('tests', () => {
  const mockStore = configureStore()

  const store = mockStore({})

  let wrapper

  wrapper = shallow(
    <Tasks store={store} />
  )

  it('change buttons', () => {
    wrapper.setState({ buttons: true })

    expect(wrapper.find('.start').at(0).hasClass('hide')).toEqual(false)
    expect(wrapper.find('.stop').at(0).hasClass('hide')).toEqual(true)
  })
})
