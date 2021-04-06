<template>
  <div class="hello">
    <div style="font-size: 26px">{{ message }}</div>
    <div>
      <svg-icon name="word"></svg-icon>
    </div>
    <div>
      <el-button @click="onLightThemes">light</el-button>
      <el-button @click="onDarkThemes">dark</el-button>
    </div>
    <div>{{ $fmtd($ls.now()) }}</div>
  </div>
</template>

<script>
import sayHelloWorld from "@/composables/sayHelloWorld";
import { ref, toRefs, getCurrentInstance } from "vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props) {
    const instance = getCurrentInstance();

    const { msg } = toRefs(props);
    const newMsg = ref(instance.ctx.$ls.clone(msg.value));

    const { message } = sayHelloWorld(newMsg);

    return {
      message,
    };
  },
  methods: {
    onLightThemes() {
      window.changeThemes("light");
    },
    onDarkThemes() {
      window.changeThemes("dark");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
