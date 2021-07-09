<template>
  <div class="container t-a-c">
    <div class="p-10 font-s-14">
      热卖商品
      <i class="iconfont icon-remai font-c-red hot"></i>
    </div>

    <div class="flex bgc-white flex-wrap">
      <div
        v-for="(item, index) in hotGoods"
        :key="index"
        @click="goodOne(item.goodsId)"
        class="width-50 border-b box"
      >
        <img :src="item.image" alt="" class="img" />
        <div class="p-5 name">{{ item.name }}</div>
        <div class="m-tb-10 p-2">
          <span class="font-c-red">￥{{ item.mallPrice }} &nbsp;</span>
          <span class="del-line">￥{{ item.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "",
  props: {
    hotGoods: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    goodOne(val) {
      // console.log(val);
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "1000",
      });
      // //  传递参数
      this.$router.push({
        path: "/Details",
        query: {
          id: val,
        },
      });
    },
  },
  mounted() {
    // console.log(this.hotGoods);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  width: 60%;
  height: 100px;
}
.box {
  height: 200px;
  padding: 10px 0;
}
.hot {
  font-size: 28px;
}
.name {
  height: 15%;
}
</style>