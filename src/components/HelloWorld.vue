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

<script lang="ts">
import sayHelloWorld from "@/composables/sayHelloWorld";
import { ref, toRefs, getCurrentInstance, defineComponent } from "vue";
import { useIndexStore } from "@/stores/index";
import api from "@/api/index";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props) {
    const instance = getCurrentInstance();
    const global = instance?.appContext.config.globalProperties;

    // const { proxy } = getCurrentInstance(); // 这样也行
    // console.log(global.$ls);

    const { msg } = toRefs(props);
    const newMsg = ref(global?.$ls.clone(msg.value));

    const iStore = useIndexStore();
    iStore.sendMessage(newMsg.value);
    const iMsg = ref(iStore.msg);

    const { message } = sayHelloWorld(iMsg);

    return {
      message,
    };
  },
  mounted() {
    api.main.ping().then(() => {
      console.log("pong");
    });
  },
  methods: {
    onLightThemes() {
      window.changeThemes("light");
    },
    onDarkThemes() {
      window.changeThemes("dark");
    },
  },
});
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
