<template>
  <div class="container">
    <div class="icon" @click="back">
      <i class="iconfont icon-web-icon- back"></i>
    </div>
    <!-- <img src="../../assets/images/login.jpg" alt="" /> -->
    <div class="login">
      <div class="m-10 font-s-18"><span>登陆</span> / <span>注册</span></div>
      <div class="login1">
        <van-form @failed="onFailed">
          <!-- 输入任意文本 -->
          <van-field
            v-model="nickname"
            placeholder="输入用户名"
            :rules="[{ required: true }]"
          />
          <!-- 输入密码 -->
          <van-field
            v-model="password"
            type="password"
            placeholder="密码"
            :rules="[{ required: true }]"
          />
          <!-- 输入手机号，调起手机号键盘 -->
          <van-field
            v-model="tel"
            type="tel"
            label="手机号码"
            placeholder="仅注册需要"
            :rules="[{ pattern, message: '请输入正确手机号' }]"
          />

          <van-field
            v-model="sms"
            center
            clearable
            label="短信验证码"
            placeholder=" 仅注册需要"
          >
            <template #button>
              <van-button size="small" type="primary" @>发送验证码</van-button>
            </template>
          </van-field>
          <!-- 图片验证码 -->
          <div class="flex jcc">
            <div class="">
              <van-field
                v-model="verify"
                label="验证码"
                :rules="[{ required: true, message: '请输入验证码' }]"
              />
            </div>
            <div v-html="code" class="code" @click="getAverify"></div>
          </div>
          <div>
            <van-button type="primary" class="foot-btn" @click="login"
              >登陆</van-button
            >
            <van-button type="danger" class="foot-btn" @click="register"
              >注册</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import HeadChild from "../../components/HeadChild";
import { Notify } from "vant";
export default {
  name: "",
  props: {},
  data() {
    return {
      tel: "",
      nickname: "",
      digit: "",
      number: "",
      password: "",
      // 短信验证码
      sms: "",
      // 验证码数据
      code: "",
      // 图片验证码
      verify: null,
      // 手机验证规则
      pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
    };
  },
  components: { HeadChild },
  methods: {
    // 登陆
    login() {
      this.$api
        .login({
          nickname: this.nickname,
          password: this.password,
          verify: this.verify,
        })
        .then((res) => {
          console.log(res);

          if (res.code === 200) {
            // 成功通知
            Notify({ type: "success", message: res.msg, duration: 1000 });
            this.$router.push("/My");
            // 本地储存用户名
            this.$store.commit("setNickname", this.nickname);
            localStorage.setItem("nickname", this.nickname);
            localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
            this.getData();
          } else {
            this.$Toast(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          Notify({ type: "success", message: err.msg, duration: 1000 });
        });
    },
    // 注册
    register() {
      this.$api
        .register({
          nickname: this.nickname,
          password: this.password,
          verify: this.verify,
        })
        .then((res) => {
          if (res.data.code === 200) {
            Notify({ type: "success", message: res.msg, duration: 1000 });
            this.$router.push("/My");
            // 本地储存用户名
            this.$store.commit("setNickname", this.nickname);
            localStorage.setItem("nickname", this.nickname);
          } else {
            Notify({
              message: "err.msg",
              color: "#ad0000",
              background: "rgb(86, 86, 87)",
              duration: 1000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 验证码
    getAverify() {
      this.$api
        .getAverify()
        .then((res) => {
          // console.log(res);
          this.code = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 返回
    back() {
      this.$router.back();
    },
    // 表单校验是否通过
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
  },
  mounted() {
    this.getAverify();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
#app {
  height: 100%;
}
.container {
  height: 100%;
  font-size: 14px;
  background: url("../../assets/images/login.jpg") no-repeat;
  // background-size: 100%, 100%;
  background-size: cover;
  // align-items: ;
  .icon {
    padding: 20px;
    padding-top: 10%;
    .back {
      padding: 5px;
      background-color: rgb(63, 63, 63);
      color: #fff;
      font-size: 20px;
      height: 200px;
      width: 200px;
      border-radius: 100%;
    }
  }

  .login {
    margin: 20px;
    margin-top: 15%;
    padding: 5px;
    height: 60%;
    background-color: #fff;
    .code {
      width: 30%;
      margin-left: 10px;
      margin-right: 10px;
    }
    .foot-btn {
      width: 30%;
      margin-top: 20px;
      margin-left: 10px;
    }
  }
}
</style>