import { takeEvery, call, put } from 'redux-saga/effects'
import { setTimer, setEndTime, setTimerId, pushTimeLocalStorage, setTaskTitle} from '../actions'
import { eventChannel } from 'redux-saga'

export default function * rootSaga () {
  yield takeEvery('START', setLocalStorage)
  yield takeEvery('RESET', removeLocalStorage)
  yield takeEvery('START_TIMER', startTimer)
  yield takeEvery('REFRESH_TIMER', refreshTimer)
  yield takeEvery('SET_TITLE', setTitleInRedux)
}

function * setLocalStorage (data) {
  try {
    const timeInMsec = new Date().getTime()

    if (data.title) {
      yield call([localStorage, 'setItem'], 'startTimer', JSON.stringify({timer: timeInMsec, title: data.title}))
      yield setTitleInRedux(data.title)
    } else {
      yield call([localStorage, 'setItem'], 'startTimer', JSON.stringify({timer: timeInMsec}))
    }

    yield refreshTimer()

  } catch (e) {
    throw e
  }
}

function * setTitleInRedux (data) {
  if (data) {
    yield put(setTaskTitle(data.title))
  }
}

function * removeLocalStorage () {
  yield call([localStorage, 'removeItem'], 'startTimer')
}

function * refreshTimer () {
  const storage = yield call([localStorage, 'getItem'], 'startTimer')
  const localStorageObj = JSON.parse(storage)

  if (localStorageObj) {
    try {
      yield put(setTaskTitle(localStorageObj.title))
      yield startTimer(localStorageObj.timer)
    } catch (e) {
      throw e
    }
  }
}

function * startTimer (timer) {
  const msecPerSec = 1000
  const msecPerMinute = msecPerSec * 60
  const msecPerHour = msecPerMinute * 60

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
