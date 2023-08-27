// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerStarted: false,
    timeInSeconds: 0,
    timeInMinutes: 25,
  }

  changeOfSeconds = () => {
    const {timeInSeconds, timeInMinutes} = this.state

    if (timeInSeconds === 0) {
      const minutes = timeInMinutes - 1
      this.setState({timeInMinutes: minutes})
    }

    if (timeInSeconds === 0) {
      this.setState({timeInSeconds: 59})
    } else {
      const seconds = timeInSeconds - 1
      this.setState({timeInSeconds: seconds})
    }
  }

  clearTimeInterval = () => {
    clearInterval(this.timerId)
  }

  onClickStartPause = () => {
    const {timerStarted, timeInMinutes, timeInSeconds} = this.state

    if (timeInMinutes === timeInSeconds) {
      this.setState({
        timerStarted: false,
        timeInMinutes: 0,
        timeInSeconds: 0,
      })
    }

    if (timerStarted) {
      this.clearTimeInterval()
    } else {
      this.timerId = setInterval(this.changeOfSeconds, 1000)
    }

    this.setState(prevState => ({timerStarted: !prevState.timerStarted}))
  }

  onClickReset = () => {
    const {timerStarted} = this.state
    if (timerStarted) {
      this.clearTimeInterval()
    }
    this.setState({
      timerStarted: false,
      timeInSeconds: 0,
      timeInMinutes: 25,
    })
  }

  settingsContainer = () => {
    const {timerStarted} = this.state
    const startPauseImage = timerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startPauseAltText = timerStarted ? 'pause icon' : 'play icon'

    const startPauseText = timerStarted ? 'Pause' : 'Start'

    return (
      <div>
        <div className="buttonsContainer">
          <button
            type="button"
            className="startPauseButton"
            onClick={this.onClickStartPause}
          >
            <img
              src={startPauseImage}
              alt={startPauseAltText}
              className="logo"
            />
            <p className="para">{startPauseText}</p>
          </button>
          <button
            type="button"
            className="startPauseButton"
            onClick={this.onClickReset}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="logo"
            />
            <p className="para">Reset</p>
          </button>
        </div>
      </div>
    )
  }

  decreaseMinutes = () => {
    const {timeInMinutes, timerStarted} = this.state
    if (timeInMinutes > 0 && !timerStarted) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes - 1}))
    }
  }

  increaseMinutes = () => {
    const {timerStarted} = this.state
    if (!timerStarted) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes + 1}))
    }
  }

  changeTime = () => {
    const {timeInMinutes} = this.state

    return (
      <div className="changeContainer">
        <button
          type="button"
          className="minusButton"
          onClick={this.decreaseMinutes}
        >
          -
        </button>
        <p className="changeMinutes">{timeInMinutes}</p>
        <button
          type="button"
          className="minusButton"
          onClick={this.increaseMinutes}
        >
          +
        </button>
      </div>
    )
  }

  runningOrPaused = () => {
    const {timerStarted} = this.state
    const result = timerStarted ? 'Running' : 'Paused'
    return result
  }

  stringSeconds = () => {
    const {timeInSeconds} = this.state
    const seconds = timeInSeconds < 10 ? `${0}${timeInSeconds}` : timeInSeconds
    return seconds
  }

  stringMinutes = () => {
    const {timeInMinutes} = this.state
    const minutes = timeInMinutes < 10 ? `${0}${timeInMinutes}` : timeInMinutes
    return minutes
  }

  render() {
    const stringMinutes = this.stringMinutes()
    const stringSeconds = this.stringSeconds()

    return (
      <div className="pageContainer">
        <h1>Digital Timer</h1>
        <div className="container">
          <div className="timerContainer">
            <div className="actualTimer">
              <h1 className="realTime">
                {stringMinutes}:{stringSeconds}
              </h1>
              <p className="realTimePara">{this.runningOrPaused()}</p>
            </div>
          </div>
          <div className="settingsContainer">
            {this.settingsContainer()}
            <p>Set Timer Limit</p>
            {this.changeTime()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
