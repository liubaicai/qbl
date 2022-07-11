import Base from "./core/base";

class Post extends Base {}

export default {
  post: new Post("/posts"),
};
