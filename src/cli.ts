import { createApp } from "./runtime-vink";
import App from "./App.vue";
import { createNode } from "./dom";
import render from "./renderer";

const root = createNode("ink-root");

const instance = createApp(App).mount(root);

root.onRender = () => {
  console.log("@", render(instance.$el, 40));
};

console.log("\n\n\n");
console.log(render(instance.$el, 40));
// console.log(root);

// console.log("*".repeat(50));
// console.log(instance.$.subTree);
