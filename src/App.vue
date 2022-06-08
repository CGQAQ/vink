<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Counter from "./components/Counter.vue";
export default defineComponent({
  components: { Counter },
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
  <div>
    <Counter :count="count" />
  </div>
</template>
