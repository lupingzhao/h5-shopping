<template>
  <div></div>
</template>

<script>
import BetterScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
    BetterScroll.use(Pullup);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>