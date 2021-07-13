<template>
  <div class="height-100">
    <van-sticky :offset-top="0">
      <!-- 所有订单 -->
      <div class="p-10 t-a-c font-s-16 flex jcsb bgc-gray">
        <div><i class="iconfont icon-zuojiantou" @click="goback"></i></div>
        <div>我的订单</div>
        <div></div>
      </div>
    </van-sticky>
    <!-- 导航 -->
    <div class="p-5">
      <van-tabs v-model="active" animated>
        <van-tab v-for="(item, index) in list" :title="item.name" :key="index">
          <!-- 订单详情 -->
          <complet-order v-if="item.data.length > 0" :list="item.data">
          </complet-order>
          <div class="empt" v-else>暂无订单</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import CompletOrder from "../../components/order/CompletOrder.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: null,
      title: ["全部", "待支付", "代发货", "待收货", "已完成"],
      active: 4,
    };
  },
  components: { CompletOrder },
  methods: {
    //返回
    goback() {
      this.$router.back();
    },
    //   获取订单信息
    getMyOrder() {
      this.$api
        .getMyOrder()
        .then((res) => {
          this.list = [
            { name: "全部", data: res.list },
            { name: "待支付", data: "" },
            { name: "代发货", data: "" },
            { name: "待收货", data: "" },
            { name: "已完成", data: res.list },
          ];

          // console.log(this.list);
        })
        .catch();
    },
  },
  mounted() {
    this.getMyOrder();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.empt {
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 16px;
}
</style>