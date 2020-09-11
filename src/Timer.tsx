import React from "react";

interface TimerState {
  countDown: number;
  isTicking: boolean;
}

class Timer extends React.Component<{}, TimerState> {
  private countDownInterval: any;
  constructor(props: any) {
    super(props);

    this.state = {
      countDown: 25,
      isTicking: false,
    };
  }

  private handleCountdown(): void {
    if (!this.state.isTicking) {
      this.startCountdown();
    } else {
      this.pauseCountdown();
    }
  }

  private handleReset(): void {
    clearInterval(this.countDownInterval);
    this.setState({ countDown: 25, isTicking: false });
  }

  private endCountdown(): void {
    this.setState({ countDown: 25, isTicking: false });
  }

  private pauseCountdown(): void {
    clearInterval(this.countDownInterval);
    const pausedAt = this.state.countDown;
    this.setState({ countDown: pausedAt, isTicking: false });
  }

  private startCountdown(): void {
    this.countDownInterval = setInterval(() => {
      if (this.state.countDown > 0) {
        const timeRemaining = this.calculateTimeRemaining();
        this.setState({ countDown: timeRemaining, isTicking: true });
      } else {
        this.handleReset();
      }
    }, 1000);
  }

  calculateTimeRemaining(): number {
    const { countDown } = this.state;
    const timeRemaining = (countDown * 60 - 1) / 60;
    return timeRemaining;
  }

  render() {
    return (
      <div className={this.state.isTicking ? "isTicking" : undefined}>
        <h1 tabIndex={0}>{Math.ceil(this.state.countDown)}</h1>
        <div className="controls">
          <button onClick={() => this.handleCountdown()}>
            {this.state.isTicking ? "Pause" : "Play"}
          </button>
          <button onClick={() => this.handleReset()}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Timer;
