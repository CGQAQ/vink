import { createApp, createRootNode } from "../../src";
import HelloWorld from "./hello-world.vue";

const root = createRootNode();

const r = createApp(HelloWorld).mount(root)

console.log("R", r, root)
