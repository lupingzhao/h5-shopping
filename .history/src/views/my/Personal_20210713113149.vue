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
        <van-field
          v-model="user1"
          label="用户名"
          :placeholder="userInfo.username"
        />
      </div>
      <div class="a-i-c flex p-tb-10">
        <van-field
          v-model="nickname"
          label="昵称"
          :placeholder="userInfo.nickname"
        />
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
        <!-- <van-field
          v-model="gender"
          label="性别"
          :placeholder="userInfo.gender"
        /> -->
      </div>
      <div class="a-i-c flex p-tb-10">
        <van-field v-model="emll" label="邮箱" placeholder="请输入邮箱" />
      </div>

      <div class="a-i-c flex p-tb-10">
        <van-field v-model="date" label="出生年月日" @focus="ipt" />
        <van-calendar v-model="show" @confirm="onConfirm" :min-date="minDate" />
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
      user1: null,
      nickname: null,
      gender: null,
      emll: null,
      date: null,
      show: false,
      minDate: new Date(1900, 0, 1),
    };
  },
  components: {},
  methods: {
    user() {
      this.$api
        .user()
        .then((res) => {
          // console.log(res);
          this.userInfo = res.userInfo;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ipt() {
      this.show = true;
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    // 修改信息
    saveUser() {
      this.$api
        .saveUser({
          gender: this.gender,
          month: this.date.substr(0, 1),
          day: this.date.substr(2, 2),
          year: this.date.substr(5, 4),
          id: null,
          nickname: this.nickname,
        })
        .then((res) => {
          this.$store.commit("setNickname", this.nickname);
          Notify({ type: "success", message: "修改成功" });
          //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goback() {
      this.$router.back();
    },
  },
  mounted() {
    this.user();
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