<template>
  <div class="bgc-white height-100" v-if="userInfo">
    <div class="p-tb-10 t-a-c font-s-16 flex jcsb bgc-gray">
      <div><i class="iconfont icon-zuojiantou" @click="goback"></i></div>
      <div>个人资料</div>
      <div></div>
    </div>
    <div class="flex jcsb a-i-c p-10">
      <div>头像</div>
      <div class="a-i-c flex">
        <div
          class="img"
          :style="{ 'background-image': 'url(' + userInfo.avatar + ')' }"
        ></div>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <div class="m-t-10">
      <div class="a-i-c flex p-tb-10">
        <van-field v-model="userInfo.username" label="用户名" />
      </div>
      <div class="a-i-c flex p-tb-10">
        <van-field v-model="userInfo.nickname" label="昵称" />
      </div>
      <div class="a-i-c flex p-tb-10">
        <van-field label="性别">
          <template #input>
            <van-radio-group v-model="userInfo.gender" direction="horizontal">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
              <van-radio name="保密">保密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="a-i-c flex p-tb-10">
        <van-field v-model="emll" label="邮箱" placeholder="请输入邮箱" />
      </div>

      <div class="a-i-c flex p-tb-10">
        <van-field v-model="date" label="出生年月日" @focus="ipt" readonly />
        <van-calendar
          v-model="show"
          @confirm="onConfirm"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </div>
      <div class="t-a-c">
        <van-button type="primary" class="btn" @click="saveUser"
          >保存</van-button
        >
      </div>
      <div class="t-a-c">
        <van-button type="default" class="btn">取消</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  name: "",
  props: {},
  data() {
    return {
      userInfo: null,
      date: null,
      show: false,
      emll: null,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
    };
  },
  components: {},
  methods: {
    ipt() {
      this.show = true;
    },
    formatDate(date) {
      return `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    // 修改信息
    saveUser() {
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      this.$router.back();
      Notify({ type: "success", message: "修改成功" });
      this.$store.commit("setNickname", this.userInfo.nickname);
    },
    goback() {
      this.$router.back();
    },
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.date = `${this.userInfo.year} 年${this.userInfo.month}月${this.userInfo.day}日`;
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-size: contain;
  margin-right: 10px;
}
.btn {
  width: 80%;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>