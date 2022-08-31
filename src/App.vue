<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Counter from "./components/Counter.vue";
import Text from "./components/Text";
export default defineComponent({
  components: { Text },
  setup() {
    const count = ref(0);
    onMounted(() => {
      setTimeout(() => (count.value += 1), 1_000);
    });
    return { count };
  },
});
</script>

<template>
  <Text>hello world</Text>
</template>
