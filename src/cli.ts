import { createApp } from "./runtime-vink";
import App from "./App.vue";

const instance = createApp(App).mount("");

// console.log("*".repeat(50));
// console.log(instance.$.subTree);
