<template>
  <div class="wdlxg">
    <!-- 第一个盒子 -->
    <div class="font-s-14 bgc-white p-b-10">
      <div class="m-lr-10 p-tb-10">CNode：Node.js专业中文社区</div>
      <div class="m-lr-10 font-s-12 flex">
        您可以 &nbsp;
        <div class="a">登录</div>
        &nbsp;或&nbsp;
        <div class="a">注册</div>
        , 也可以
      </div>
      <div class="p-10 login shou" @click="login">
        <div v-if="msg === null">通过 GitHub 登录</div>
        <div v-else>{{ msg }}</div>
      </div>
    </div>

    <!-- 第二个盒子 -->
    <div class="bgc-white m-t-10 font-s-14">
      <div class="p-tb-10 pl-10 c-l font-w-7">无人回复的话题</div>
      <div class="p-tb-10 shou">
        <div class="m-10 ellipsis font-c-gray">
          使用 Socket.IO 进行授权和握手
        </div>
        <div class="m-10 ellipsis font-c-gray">
          是否可以使用nginx转发websocket实现Node远程调试？
        </div>
        <div class="m-10 ellipsis font-c-gray">
          typescript+nodejs报错：Cannot redeclare block-scoped variable
        </div>
        <div class="m-10 ellipsis font-c-gray">
          现在firefox的更新是不是在更新tab?
        </div>
        <div class="m-10 ellipsis font-c-gray">
          web如何检测Ipad上safari处于分屏模式
        </div>
      </div>
    </div>

    <!-- 第三个盒子 -->
    <div class="bgc-white m-t-10 font-s-14">
      <div class="flex p-10 c-l">
        积分榜
        <div class="shou ml-25">
          TOP 100
          <i class="iconfont icon-xianxingtubiaozhizuomoban-12"></i>
        </div>
      </div>
      <div class="p-10">
        <div class="flex font-c-gray p-t-10">
          <div class="pr-25">22720</div>
          <div class="shou-xhx">i5ting</div>
        </div>
        <div class="flex font-c-gray p-t-10">
          <div class="pr-25">15840</div>
          <div class="shou-xhx">alsotang</div>
        </div>
        <div class="flex font-c-gray p-t-10">
          <div class="pr-25">10045</div>
          <div class="shou-xhx">atian25</div>
        </div>
        <div class="flex font-c-gray p-t-10">
          <div class="pr-25">9350</div>
          <div class="shou-xhx">leapon</div>
        </div>
        <div class="flex font-c-gray p-t-10">
          <div class="pr-25">8780</div>
          <div class="shou-xhx">jiyingyiyong</div>
        </div>
        <div class="flex font-c-gray p-t-10">
          <div class="pr-25">7800</div>
          <div class="shou-xhx">yakczh</div>
        </div>
        <div class="flex font-c-gray p-t-10">
          <div class="pr-25">6855</div>
          <div class="shou-xhx">im-here</div>
        </div>
        <div class="flex font-c-gray p-t-10">
          <div class="pr-25">6135</div>
          <div class="shou-xhx">DevinXian</div>
        </div>
        <div class="flex font-c-gray p-t-10">
          <div class="pr-25">5815</div>
          <div class="shou-xhx">chapgaga</div>
        </div>
        <div class="flex font-c-gray p-t-10 p-b-10">
          <div class="pr-25">5375</div>
          <div class="shou-xhx">magicdawn</div>
        </div>
      </div>
    </div>
    <!-- 第三个盒子 -->
    <div class="bgc-white m-t-10 font-s-14 lj">
      <div class="p-10 c-l">友情社区</div>
      <img
        src="../../../assets/images/ruby-china-20150529.png"
        alt=""
        class="m-t-10 shou"
      />
      <img
        src="../../../assets/images//golangtc-logo.png"
        alt=""
        class="shou"
      />
      <img
        src="../../../assets/images//phphub-logo.png"
        alt=""
        class="mb-10 shou"
      />
    </div>

    <!-- 第四个盒子 -->
    <div class="bgc-white m-t-10 font-s-14">
      <div class="p-10 c-l">客户端二维码</div>
      <div class="ewm">
        <img src="../../../assets/images/ewm.png" alt="" class="ewm" />
      </div>
      <div class="p-b-10 t-a-c">
        <div class="a">客户端源码地址</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      user: "12345",
      msg: null,
    };
  },
  components: {},
  methods: {
    login() {
      this.$emit("login", this.user);
      // localStorage.setItem("user", 1123);
    },
  },
  mounted() {
    console.log(location.search);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.lj > img {
  width: 150px;
  padding-left: 10px;
}
.ewm {
  width: 200px;
  margin: 10px auto;
  /* position: ; */
}
.login {
  width: 113px;
  margin: 5px 0 0 10px;
  color: white;
  background-color: rgb(91, 192, 222);
}

/* 登录鼠标效果 */
.login:hover {
  background-color: rgb(47, 150, 180);
}
</style>