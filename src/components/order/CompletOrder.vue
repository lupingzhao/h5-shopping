<template>
  <div class="box">
    <!-- 循环订单信息 -->
    <div
      v-for="(item, index) in list"
      :key="index"
      class="p-lr-10 font-s-14 bgc p-b-10"
    >
      <div class="p-tb-20 flex jcsb">
        <div>订单编号：{{ item.order_id }}</div>
        <div class="font-c-red">交易完成</div>
      </div>
      <!-- 循环商品信息 -->
      <div
        class="flex a-i-fs jcsb m-t-5"
        v-for="(item1, index1) in item.order_list"
        :key="index1"
      >
        <div class="flex">
          <div><img :src="item1.image_path" alt="" class="img" /></div>
          <div class="p-lr-10">{{ item1.name }}</div>
        </div>
        <div class="price">
          <div>￥{{ item1.present_price }}</div>
          <div class="t-a-r p-5 font-s-12">X{{ item1.count }}</div>
        </div>
      </div>

      <!-- 收货地址信息 -->
      <div class="t-a-r p-b-10 msg">
        <div>创建时间：{{ item.add_time }}</div>
        <div class="p-tb-10">收货地址：{{ item.address }}</div>
        <div>
          共计{{ item.order_list.length }} 件商品 &nbsp; 合计：{{
            item.mallPrice
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
    // console.log(this.list);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  background-color: #f5f5f5;
  .img {
    width: 80px;
  }
  .bgc {
    background-color: #fff;
    border-radius: 15px;
    margin: 10px 5px;
  }
  .msg {
    margin-top: 20px;
    padding-top: 5px;
    border-top: 1px solid rgb(184, 182, 182);
  }
}
</style>