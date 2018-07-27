import { takeEvery, call, put } from 'redux-saga/effects'
import { setTimer, setEndTime, setTimerId, toggleButtons, pushTimeLocalStorage } from '../actions'
import { eventChannel } from 'redux-saga'

export default function * rootSaga () {
  yield takeEvery('START', setLocalStorage)
  yield takeEvery('RESET', removeLocalStorage)
  yield takeEvery('START_TIMER', startTimer)
  yield takeEvery('REFRESH_TIMER', refreshTimer)
}

function * setLocalStorage () {
  const timeInMsec = new Date().getTime()

  yield call([localStorage, 'setItem'], 'startTimer', timeInMsec)
}

function * removeLocalStorage () {
  yield call([localStorage, 'removeItem'], 'startTimer')
}

function * refreshTimer () {
  try {
    const timer = yield call([localStorage, 'getItem'], 'startTimer')

    if (timer) {
      yield put(toggleButtons())
      yield startTimer()
    }
  } catch (e) {
    throw new Error(e)
  }
}

function * startTimer () {
  const msecPerSec = 1000
  const msecPerMinute = msecPerSec * 60
  const msecPerHour = msecPerMinute * 60
  const timer = yield call([localStorage, 'getItem'], 'startTimer')

  yield put(pushTimeLocalStorage(timer))

  function getTimeNow () {
    const timeNow = new Date()

    return {
      hours: timeNow.getHours(),
      minutes: timeNow.getMinutes(),
      seconds: timeNow.getSeconds()
    }
  }

  const channel = yield call(countdown)

  yield takeEvery(channel, function * (id) {
    yield put(setTimerId(id))

    const getTimeMsec = new Date().getTime()

    let interval = getTimeMsec - Number(timer)

    yield put(setEndTime(getTimeNow()))

    yield put(
      setTimer({
        hours: Math.floor(interval / msecPerHour),
        minutes: new Date(interval).getMinutes(),
        seconds: new Date(interval).getSeconds()
      })
    )
  })
}

function countdown () {
  return eventChannel(emitter => {
    const id = setInterval(() => {
      emitter(id)
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }
  )
}
