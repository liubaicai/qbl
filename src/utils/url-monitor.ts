import EventEmitter from "events";
import axios from "axios";

enum Status {
  SUCCESS = "success",
  STARTED = "started",
  ERROR = "error",
  STOPPED = "stopped",
}

class UrlMonitor extends EventEmitter {
  url: string;
  interval: number;
  timeout: number;
  stus: string;

  Status = Status;

  intervalInstance: NodeJS.Timer | null = null;

  constructor(options: { url: string; interval?: number; timeout?: number }) {
    super();
    this.url = options?.url;
    this.interval = options?.interval || 1000;
    this.timeout = options?.timeout || 3000;
    this.stus = "stopped";
  }

  start = () => {
    const that = this;
    this.emit("change", this.Status.STARTED);
    this.intervalInstance = setInterval(() => {
      const service = axios.create({
        timeout: this.timeout,
      });
      service
        .get(this.url)
        .then(function () {
          that.emit("change", that.Status.SUCCESS);
        })
        .catch(function () {
          that.emit("change", that.Status.ERROR);
        });
    }, this.interval);
  };

  stop = () => {
    this.emit("change", this.Status.STOPPED);
    if (this.intervalInstance) clearInterval(this.intervalInstance);
  };
}

export default UrlMonitor;
