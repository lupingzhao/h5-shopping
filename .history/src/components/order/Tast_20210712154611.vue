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
import Bscroll from "better-scroll";
export default {
  name: "",
  props: {},
  data() {
    return {
      pageNo: 1,
      totalPage: 0,
      isPullDown: false,
      options: {
        probeType: 3,
        pullDownRefresh: {
          threshold: 40, // 刷新时机
          stop: 30, // 回弹停留的距离
        },
        pullUpLoad: {
          threshold: 20, // 开始加载的时机
        },
        startY: 0,
      },

      isPullUpLoad: false,
      data: 30,
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
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