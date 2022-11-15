import { createApp, createVinkApp } from "../../src";
import HelloWorld from "./hello-world.vue";

const root = createVinkApp(HelloWorld);

console.log(root);
