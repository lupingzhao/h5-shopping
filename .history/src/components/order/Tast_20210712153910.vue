<template>
  <div class="pullup">
    <div ref="scroll" class="pullup-wrapper">
      <div class="pullup-content">
        <ul class="pullup-list">
          <li v-for="i of data" :key="i" class="pullup-list-item">
            {{ i % 5 === 0 ? "scroll up 👆🏻" : `I am item ${i} ` }}
          </li>
        </ul>
        <div class="pullup-tips">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BetterScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";

export default {
  name: "",
  props: {},
  data() {
    return {
      isPullUpLoad: false,
      data: 30,
    };
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
.pullup {
  height: 100%;

  .pullup-wrapper {
    height: 100%;
    padding: 0 10px;
    border: 1px solid #ccc;
    overflow: hidden;
  }

  .pullup-list {
    padding: 0;
  }

  .pullup-list-item {
    padding: 10px 0;
    list-style: none;
    border-bottom: 1px solid #ccc;
  }

  .pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>