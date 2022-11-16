# Render Vue Components in Cli (WIP)

A custum Vue3 renderer to provided the same component-based UI building
experience that Vue3 offers in the browser, but for command-line apps. It uses
[Yoga](https://github.com/facebook/yoga) to build Flexbox layouts in the
terminal, so most CSS-like props are available in vue-custom-renderer as well.
The project is based on [ink](https://github.com/vadimdemedes/ink).

## Usage

Counter.vue:

```vue
<template>
    <!-- Text will simply out put text -->
    <Text>{{ msg }}({{ counter }}s)</Text>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from "vue";
import Text from "../../src/builtin/Text";

const msg = ref("Hello World from vink");
const counter = ref(0);

let handle;
onMounted(() => {
    handle = setInterval(() => {
        counter.value++;
    }, 1000);
});

onBeforeUnmount(() => {
    clearInterval(handle);
});
</script>

```

index.js:

```js
import { createVinkApp } from "../../src";
import HelloWorld from "./hello-world.vue";

createVinkApp(HelloWorld);
```

<img src="assets/Recording%202022-11-16%20at%2008.53.16.gif" width="600">
