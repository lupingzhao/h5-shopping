<template>
  <div class="flex box jcsb pr-5">
    <!-- 插槽 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="middle">
      <slot name="middle"></slot>
    </div>

    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadChild",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  background-color: #f5f5f5;
  .left {
    width: 20%;
    text-align: center;
  }
  .middle {
    width: 70%;
    .van-search__content {
      padding-left: 0;
      text-indent: 5px;
    }
    .van-search {
      background-color: #fff;
      padding: 0;
      padding-right: 5px;

      width: 100%;
      .van-cell {
        padding-left: 0 !important;
        background-color: #fff;
        width: 100%;
      }
    }
  }
}
</style>