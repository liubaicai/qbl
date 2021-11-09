import { ref, onMounted } from "vue";

export default function sayHelloWorld(msg) {
  const message = ref("");
  const sayHello = async () => {
    message.value = `${msg.value}!`;
  };

  onMounted(sayHello);

  return {
    message,
  };
}
