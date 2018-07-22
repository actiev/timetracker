import React from 'react'
import PropTypes from 'prop-types'

const Time = ({ time }) => (
  <div>
    {!time ? '00:00:00' : (
      (time.hours < 10 ? '0' + time.hours : time.hours) +
      ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes) +
      ':' + (time.seconds < 10 ? '0' + time.seconds : time.seconds))}
  </div>
)

Time.propTypes = {
  time: PropTypes.shape({
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
  })
}

export default Time
