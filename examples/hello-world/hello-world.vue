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
