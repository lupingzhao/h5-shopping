<template>
  <div class="box font-s-14">
    <div class="height-100">
      <div class="p-tb-10 t-a-c font-s-16">会员中心</div>
      <div class="banner font-c-w">
        <div class="t-a-r p-tb-10 pr-10">
          <van-icon name="setting-o" size="30" @click="go('/Personal')" />
        </div>

        <!-- 未登录 -->
        <div v-if="!name" class="flex jcc a-i-c">
          <div>
            <div class="bottom-img"></div>
            <div @click="goLogin" class="bottom-button t-a-c">去登陆</div>
          </div>
        </div>
        <!-- 登陆 -->
        <div v-else class="flex jcc a-i-c">
          <div class="t-a-c">
            <div class="flex jcc">
              <div
                v-if="userInfo"
                class="img-tx"
                :style="{
                  'background-image': 'url(' + userInfo.avatar + ')',
                }"
              ></div>
            </div>
            <div class="m-t-10">欢迎您：{{ name }}</div>
            <div class="m-t-10" @click="logout">退出登陆</div>
          </div>
        </div>
      </div>
      <!-- 导航栏 -->
      <div class="p-tb-10 bgc-white mb-10">
        <van-tabbar route :fixed="false">
          <van-tabbar-item replace>
            <div class="t-a-c">
              <div class="iconfont icon-iconfont0090 mb-10 icon2"></div>
              待付款
            </div>
          </van-tabbar-item>
          <van-tabbar-item replace>
            <div class="t-a-c">
              <div class="iconfont icon-daifahuo mb-10 icon2"></div>
              代发货
            </div>
          </van-tabbar-item>

          <van-tabbar-item replace>
            <van-badge :content="10">
              <div class="t-a-c">
                <div class="iconfont icon-baoguo mb-10 icon2"></div>
                待收货
              </div>
            </van-badge>
          </van-tabbar-item>
          <van-tabbar-item @click="go('/Comment')">
            <div class="t-a-c">
              <div class="iconfont icon-pingjia mb-10 icon2"></div>
              待评价
            </div>
          </van-tabbar-item>
        </van-tabbar>
      </div>
      <!-- 分类 -->
      <div class="flex jcsb p-10 font-s-16 border-b" @click="go('/AllOrder')">
        <div class="flex a-i-c">
          <i class="iconfont icon-dingwei- icon1"></i> 全部订单
        </div>
        <div><i class="iconfont icon-youjiantou"></i></div>
      </div>
      <div class="flex jcsb p-10 font-s-16 border-b" @click="go('/Collection')">
        <div class="flex a-i-c">
          <i class="iconfont icon-shoucang icon1"></i> 收藏商品
        </div>
        <div><i class="iconfont icon-youjiantou"></i></div>
      </div>
      <div
        class="flex jcsb p-10 font-s-16 border-b"
        @click="go('/AddressView')"
      >
        <div class="flex a-i-c">
          <i class="iconfont icon-dizhi icon1"></i> 地址管理
        </div>
        <div><i class="iconfont icon-youjiantou"></i></div>
      </div>
      <div class="flex jcsb p-10 font-s-16 border-b" @click="go('/History')">
        <div class="flex a-i-c">
          <i class="iconfont icon-liulan icon1"></i>
          最近浏览
        </div>
        <div><i class="iconfont icon-youjiantou"></i></div>
      </div>
    </div>
    <!-- 底部 -->
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import { Notify } from "vant";
import FootNav from "../../components/footnav/FootNav.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      userInfo: null,
    };
  },
  components: { FootNav },
  methods: {
    // 前去登陆
    goLogin() {
      this.$router.push("/Login");
    },
    // 退出
    logout() {
      this.$api
        .loginOut()
        .then((res) => {
          // 成功通知
          Notify({ type: "success", message: "退出成功" });
        })
        .catch();
      this.$router.push("/");
      this.$store.commit("setNickname", null);
      localStorage.clear();
    },
    // 跳转路由
    go(val) {
      if (this.name) {
        this.$publicJs.go(val);
      } else {
        this.$Toast("未登录");
      }
    },
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  computed: {
    name() {
      return this.$store.state.nickname;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  .img-tx {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background-size: contain;
  }
  height: 100%;
  .banner {
    background-color: rgb(218, 98, 19);
    height: 35%;
  }
  .empt {
    transform: translateY(35%);
  }
  .icon1 {
    font-size: 25px;
    margin-right: 5px;
  }
  .img {
    width: 20%;
  }
  .icon2 {
    font-size: 20px;
    color: rgb(105, 102, 102) !important;
  }
  .bottom-button {
    transform: translateY(50%);
  }
  .bottom-img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background: url("http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg");
    background-size: contain;
  }
}
</style>