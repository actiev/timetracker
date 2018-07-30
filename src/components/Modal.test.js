import React from 'react'
import { shallow, configure } from 'enzyme'
import Modal from './Modal'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

it('change state modalBox', () => {
  const wrapper = shallow(<Modal open={true} action={jest.fn()} />)

  wrapper.setState({ open: true })

  expect(wrapper.state('open')).toEqual(true)

})
