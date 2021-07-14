<template>
  <div class=".container-pc">
    <Childleft></Childleft>

    <div class="content">
      <div class="width-70">
        <!-- 标题栏 -->
        <div class="c-l flex font-s-16">
          <div class="bt bt1 m-5-10 qb">全部</div>
          <div class="bt bt1 m-5-10">精华</div>
          <div class="bt bt1 m-5-10">分享</div>
          <div class="bt bt1 m-5-10">回答</div>
          <div class="bt bt1 m-5-10">招聘</div>
          <div class="bt bt1 m-5-10">客户端测试</div>
        </div>

        <!-- 详细内容 js获取 -->
        <div class="bgc-white" id="hq">
          <!-- 一行显示的内容 -->
          <!-- <div class="hqnr"> -->
          <!-- <div class="flex"> -->
          <!-- <img src="" alt="" class="hq-img1"> -->
          <!-- <div class="hq-z-1">62</div> -->
          <!-- <div> /</div> -->
          <!-- <div class="hq-z-2">46223</div> -->
          <!-- <div class="hq-zd">置顶</div> -->
          <!-- <div class="hq-bt">2021年3月6日Node Party PPT</div> -->
          <!-- </div> -->
          <!-- <div class="flex"> -->
          <!-- <div class="hq-sjc p-2">1天前</div> -->
          <!-- </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>

    <Childfoot></Childfoot>
  </div>
</template>

<script>
import Childleft from "../components/childleft/Childleft";
import Childfoot from "../components/childfoot/Chidfoot";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    // 注册子组件
    Childleft,
    Childfoot,
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>