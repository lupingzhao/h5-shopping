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
    const bs = new BetterScroll(".wrapper", {
      pullUpLoad: true,
    });

    bs.on("pullingUp", () => {
      await fetchData();
      bs.finishPullUp();
    });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>