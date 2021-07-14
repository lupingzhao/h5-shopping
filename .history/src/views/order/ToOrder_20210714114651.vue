<template>
  <div>
    <!-- 头 -->
    <div class="p-10 t-a-c font-s-16 flex jcsb bgc-gray">
      <div><i class="iconfont icon-zuojiantou" @click="goback"></i></div>
      <div>订单支付</div>
      <div></div>
    </div>
    <!-- 无收货地址时 -->
    <div v-if="data1.length === 0" class="empt" @click="eidet">
      暂无默认地址，去添加
    </div>
    <div v-else>
      <order-head :data1="data1" v-if="data1"></order-head>
    </div>
    <div v-if="data" class="flex jcc">
      <div class="width-100">
        <van-card
          class="card"
          v-for="(item, index) in data"
          :key="index"
          :num="item.count"
          :price="item.present_price"
          :title="item.name"
          :thumb="item.image_path"
        />
      </div>
    </div>
    <div>
      <van-submit-bar
        :loading="boo"
        :price="price"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import OrderHead from "../../components/order/OrderHead.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      data: [],
      // 加载
      boo: false,
      // 地址数据
      data1: "",
    };
  },
  components: { OrderHead },
  methods: {
    goback() {
      if (localStorage.getItem("idDirect")) {
        // //  传递参数
        this.$router.push({
          path: "/Details",
          query: {
            id: this.data.id,
          },
        });
      } else {
        this.$router.push("/CarViews");
      }
    },
    // 点击提交订单
    onSubmit() {
      // 有收货地址时
      if (this.data1) {
        let orderIds = [];
        let idDirect;
        //立即支付页面
        if (localStorage.getItem("idDirect")) {
          idDirect = true;
          this.data.map((a) => {
            orderIds.push(a.id);
          });
        } else {
          idDirect = false;
          // 购物车购买
          this.data.map((a) => {
            orderIds.push(a.cid);
          });
        }
        // console.log(orderIds);
        this.boo = true;

        let args = {
          address: `${this.data1.province}${this.data1.city}${this.data1.county}${this.data1.addressDetail}`,
          tel: this.tel,
          orderId: orderIds,
          totalPrice: this.price / 100,
          idDirect: idDirect,
          count: this.data[0].count,
        };
        this.$api
          .placeOrder({ ...args })
          .then((res) => {
            this.$Toast.success(res.msg);
            this.boo = false;
            this.$router.push("/My");
            localStorage.removeItem("carDatas"),
              // 清楚本地修改的地址
              localStorage.removeItem("oderAdderss");
            localStorage.removeItem("idDirect");
          })
          .catch();
      } else {
        this.$Toast("无收货地址");
      }
    },
    // 添加地址
    eidet() {
      this.$router.push("/AddressView");
      localStorage.setItem("toOder", "1");
    },
    // 默认地址
    DefaultAddress() {
      // 是否有传递的地址

      // console.log(JSON.parse(localStorage.getItem("oderAdderss")));
      if (JSON.parse(localStorage.getItem("oderAdderss"))) {
        this.data1 = JSON.parse(localStorage.getItem("oderAdderss"));
      } else {
        this.$api
          .getDefaultAddress()
          .then((res) => {
            // console.log(res);
            if (res.defaultAdd === null) {
              this.$Toast("暂无默认收获地址，去添加");
            } else {
              this.data1 = res.defaultAdd;
            }
          })
          .catch();
      }
    },
  },
  mounted() {
    this.DefaultAddress();
    // 订单详情
    this.data = JSON.parse(localStorage.getItem("carDatas"));
    // console.log(this.data);
  },
  computed: {
    price() {
      let sum = 0;
      this.data.map((a) => {
        sum += a.count * a.present_price;
      });
      return sum * 100;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.card {
  margin: auto;
  width: 97%;
  margin-top: 6px;
  margin-bottom: 6px;
  border-radius: 10px;
  background-color: #fff;
  font-size: 16px;
  .van-card__num {
    color: red;
  }
}
.empt {
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: rgb(209, 89, 19);
}
</style>