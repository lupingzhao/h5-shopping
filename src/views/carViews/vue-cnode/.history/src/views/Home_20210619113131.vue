<template>
  <div class=".container-pc">
    <Childleft></Childleft>

    <div class="content">
      <div class="w p-tb-20 a-i-fs">
        <!-- 左侧盒子 -->
        <div class="width-70">
          <Contentleft></Contentleft>

          <!-- 详细内容 js获取 -->
          <Contenhq></Contenhq>
        </div>

        <!--右侧盒子 -->
        <div id="hzr" class="width-30 m-l-15">
          <Contentrigth @login="login" ref="dl"></Contentrigth>
        </div>
      </div>
    </div>

    <Childfoot></Childfoot>
  </div>
</template>

<script>
// 引用子组件
import Childleft from "../components/childleft/Childleft";
import Childfoot from "../components/childfoot/Chidfoot";
import Contentleft from "../components/childcontent/Contentleft";
import Contenhq from "../components/childcontent/contenhq/Contenhq";
// import Contentrigth from "../components/childcontent/Contentrigth";
import Contentrigth from "../components/childcontent/contentrigth/Contentrigth";

export default {
  name: "",
  props: {},
  data() {
    return {
      ids: null,
    };
  },
  components: {
    // 注册子组件
    Childleft,
    Childfoot,
    Contentleft,
    Contentrigth,
    Contenhq,
  },
  methods: {
    login(val) {
      console.log(val);
      if (val !== "") {
        this.$nextTick(() => {
          this.$refs.dl.msg = val;
        });
      }
    },
    // 点击标题跳转页面
    click(a) {
      console.log(a);
      this.$nextTick(() => {
        window.open(`./conten?id=${a}`, "_self");
      });
    },
  },
  mounted() {
    // let user = localStorage.getItem("user");
    // console.log(user);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.content {
  background-color: rgb(225, 225, 225);
}
</style>