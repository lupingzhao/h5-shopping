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
import BScroll from "better-scroll";

export default {
  name: "",
  props: {},
  data() {
    return {
      isPullUpLoad: false,
      data: 30,
      bscroll: null,
      pullingUpOver: false,
    };
  },
  components: {},
  methods: {
    initBscroll() {
      this.bscroll = new BScroll(this.$refs.scroll, {
        pullUpLoad: true,
        click: true,
      });
    },
    pullingUpHandler() {
      this.pullingUpOver = true;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initBscroll();
      this.bscroll.on("pullingUp", () => {
        if (!this.pullingUpOver) {
          this.myScroll.finishPullUp();
          //关闭上拉加载功能
          this.myScroll.closePullUp();
          this.pullingUpHandler();
        }
      });
    });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.pullup {
  height: 100vh;
  overflow: hidden;
  .pullup-wrapper {
    padding: 0 10px;
    border: 1px solid #ccc;
    overflow: hidden;
    height: 100vh;
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