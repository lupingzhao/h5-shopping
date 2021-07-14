<template>
  <div>
    <van-popup
      v-model="show"
      @closed="closed"
      position="bottom"
      :style="{ height: '35%' }"
    >
      <div class="flex p-5">
        <img :src="good.image_path" alt="" class="img" />
        <div class="width-100">
          <div class="flex jcsb font-s-12 width-100">
            <div>{{ good.name }}</div>
            <div @click="closed">X</div>
          </div>
          <div class="p-tb-10">￥{{ good.present_price }}</div>
        </div>
      </div>
      <div class="flex p-10 jcsb">
        <div>
          <div>购买数量：</div>
          <div class="m-tb-10">
            剩余：{{ good.amount }} <span class="font-c-red">每人限购50件</span>
          </div>
        </div>
        <div>
          <van-stepper v-model="value" min="1" max="50" @change="change" />
        </div>
      </div>
      <van-button type="primary" class="width-100 btn" @click="buy"
        >立即购买</van-button
      >
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    good: {
      type: Object,
    },
  },
  data() {
    return {
      show: true,
      value: 1,
    };
  },
  components: {},
  methods: {
    closed() {
      this.$emit("closed", false);
    },
    // 步进器事件
    change(value) {
      this.value = value;
      // console.log(value);
    },
    // 购买
    buy() {
      // console.log(this.good);
      // 添加一个count属性
      if (localStorage.getItem("nickname")) {
        this.$set(this.good, "count", this.value);
        localStorage.setItem("carDatas", JSON.stringify([this.good]));
        localStorage.setItem("idDirect", JSON.stringify(true));
        this.$router.push("/ToOrder");
      } else {
        Dialog.confirm({
          title: "未登录",
          message: "是否前去登陆",
        })
          .then(() => {
            this.$router.push("/Login");
          })
          .catch(() => {
            // on cancel
          });
      }
    },
  },
  mounted() {
    // console.log(this.good);
    // 进入页面显示在顶部
    window.scroll(0, 0);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  width: 80px;
}
.btn {
  position: absolute;
  bottom: 0;
}
</style>