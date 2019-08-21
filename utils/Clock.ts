export class Clock {
  intervalId: number;
  interval: number;
  progress: number = 0;
  isPlaying: boolean;
  cb: Function;
  duration: number;
  speed = 1;

  constructor(interval: number) {
    this.interval = interval;
  }

  private clear = () => {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  public setSpeed = (speed: number) => {
    this.speed = speed;
  };

  public seek = (progress: number) => {
    this.progress = progress;
  };

  public start = (duration, cb) => {
    this.isPlaying = true;
    this.duration = duration;
    this.cb = cb;
    this.intervalId = self.setInterval(() => {
      cb(this.progress);
      this.progress =
        this.progress + (this.interval / (duration * 1000)) * this.speed;
    }, this.interval);
  };

  public toggle = () => {
    this.isPlaying ? this.pause() : this.start(this.duration, this.cb);
  };

  public pause = () => {
    this.clear();
  };

  public stop = () => {
    this.clear();
    this.duration = 0;
    this.cb = undefined;
    this.progress = 0;
  };
}
