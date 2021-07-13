<template>
  <div class="content">
    <div class="scroll">
      <div class="loading"></div>
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
      <div class="item">6</div>
      <div class="item">7</div>
      <div class="item">8</div>
      <div class="item">9</div>
      <div class="item">10</div>
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
  methods: {
    initScroll() {
      this.myScroll = new Bscroll(".content", this.options);
      this.pullDownEvent();
      this.pullUpLoadEvent();
    },
    requestData() {
      axios.post("", { pageNo: this.pageNo, pageSize: 10 }).then((res) => {
        if (this.isPullDown) {
          this.dataList = []; // 清空数据，以防重复渲染
        }
        this.dataList = res.data.list;
        this.pageNo = res.pageNo;
        this.totalPage = res.totalPage;
        this.$nextTick(() => {
          this.finishPull();
        });
      });
    },
    finishPulling() {
      this.myScroll.finishPullDown(); // 结束下拉刷新
      this.myScroll.finishPullUp(); // 结束上拉加载更多
      this.myScroll.refresh(); // dom节点变化，重新计算better-scroll
    },
    pullDownEvent() {
      this.myScroll.on("pullingDown", () => {
        this.isPullDown = true;
        console.log("下拉刷新");
        this.pageNo = 1;
        this.requestData();
      });
    },
    pullUpLoadEvent() {
      this.myScroll.on("pullingUp", () => {
        console.log("上拉加载");
        if (this.pageNo < this.totalPage) {
          this.pageNo++;
          this.requestData();
        }
      });
    },
  },
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