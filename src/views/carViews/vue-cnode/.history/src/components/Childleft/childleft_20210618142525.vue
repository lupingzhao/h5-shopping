<template>
  <!-- 顶部导航栏 -->
  <div class="head bgc-bj">
    <div class="w">
      <!-- 左侧 -->
      <div class="flex left">
        <img src="./images/logo.png" alt="" class="shou logo m-10" />
        <div class="pos-rel">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" class="input-ipt" id="ipt" />
        </div>
      </div>
      <!-- 右侧 -->
      <div class="flex shou">
        <div class="h-hav">首页</div>
        <div class="h-hav">新手入门</div>
        <div class="h-hav">API</div>
        <div class="h-hav">关于</div>
        <div class="h-hav">注册</div>
        <div class="h-hav dl">登录</div>
        <div class="h-hav tc bxs">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
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
// 外层盒子样式
.bgc-bj {
  background-color: rgb(68, 68, 68);
}
// 左侧样式
.left {
  .shou:hover {
    cursor: pointer;
  }
  .logo {
    width: 120px;
  }
  .icon-sousuo {
    font-size: 12px !important;
    position: absolute;
    left: 8px;
    top: 6px;
  }
  .input-ipt {
    width: 200px;
    height: 25px;
    text-indent: 2em;
    background-color: rgb(136, 136, 136);
    border-radius: 20px;
  }
}
</style>