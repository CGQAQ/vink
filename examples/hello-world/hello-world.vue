<template>
    <!-- Text will simply out put text -->
    <Text>{{ msg }}({{ counter }}s)</Text>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Text from "../../src/builtin/Text";

const msg = ref("Hello World from vink");
const counter = ref(0);

watchEffect((onClean) => {
    const handle = setInterval(() => {
        counter.value++;
    }, 1000);

    onClean(() => {
        clearInterval(handle);
    });
});
</script>
