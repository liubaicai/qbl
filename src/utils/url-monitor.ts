import EventEmitter from "events";
import axios from "axios";

class UrlMonitor extends EventEmitter {
  url: string;
  interval: number;
  timeout: number;
  stus: string;

  intervalInstabce: NodeJS.Timer | null = null;

  constructor(options: { url: string; interval?: number; timeout?: number }) {
    super();
    this.url = options?.url;
    this.interval = options?.interval || 1000;
    this.timeout = options?.timeout || 3000;
    this.stus = "stopped";
  }

  start = () => {
    const that = this;
    this.emit("change", "started");
    this.intervalInstabce = setInterval(() => {
      const service = axios.create({
        timeout: this.timeout,
      });
      service
        .get(this.url)
        .then(function () {
          that.emit("change", "success");
        })
        .catch(function () {
          that.emit("change", "error");
        });
    }, this.interval);
  };

  stop = () => {
    this.emit("change", "stopped");
    if (this.intervalInstabce) clearInterval(this.intervalInstabce);
  };
}

export default UrlMonitor;
