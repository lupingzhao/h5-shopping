<template>
  <div class="foot">
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/">
        <div class="t-a-c">
          <div class="iconfont icon-shouye mb-10"></div>
          首页
        </div>
      </van-tabbar-item>
      <van-tabbar-item replace to="/Classification">
        <div class="t-a-c">
          <div class="iconfont icon-liebiao_ mb-10"></div>
          分类
        </div>
      </van-tabbar-item>

      <van-tabbar-item replace to="/CarViews">
        <van-badge :content="carNum" max="20">
          <div class="t-a-c">
            <div class="iconfont icon-xiazai1 mb-10"></div>
            购物车
          </div>
        </van-badge>
      </van-tabbar-item>
      <van-tabbar-item replace to="/My">
        <div class="t-a-c">
          <div class="iconfont icon-04 mb-10"></div>
          我的
        </div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      active: 0,
      badge: 3,
    };
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {
    carNum() {
      if (this.$store.state.nickname) {
        if (this.$store.state.carNum > 0) {
          return this.$store.state.carNum;
        } else {
          return;
        }
      } else {
        return;
      }
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.foot {
  margin-top: 50px;
  .iconfont {
    font-size: 20px;
  }
}
</style>