import { createApp } from "./runtime-vink";
import App from "./App.vue";
import { createNode } from "./dom";
import render from "./renderer";

const root = createNode("ink-root");
const instance = createApp(App).mount(root);

console.log("\n\n\n");
console.log(render(root, 40));

// console.log("*".repeat(50));
// console.log(instance.$.subTree);
