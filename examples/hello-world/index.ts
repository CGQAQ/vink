import { createApp, createRootNode } from "../../src";
import HelloWorld from "./hello-world.vue";

const root = createRootNode();

const app = createApp(HelloWorld);

console.log("--------------------------------");
console.log("R", root);
console.log("-------------------------------------------------------");

const r = app.mount(root);
console.log(
  "------------------------------------------------------------------------------"
);

setInterval(() => {
  console.log("#current# ", root.children[0].children[0].text);
}, 1000);