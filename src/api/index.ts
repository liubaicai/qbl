import Base from "./core/base";

class Main extends Base {
  ping = () => this.get("/ping");
}

export default {
  main: new Main("/"),
};
