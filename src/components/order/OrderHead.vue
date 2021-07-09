<template>
  <div>
    <!-- 地址 -->
    <div class="flex width-100 jcsb p-tb-10" @click="goedit">
      <div class="pl-10"><i class="iconfont icon-dizhi"></i></div>
      <div class="width-100 m-lr-10">
        <div class="flex jcsb">
          <div>收货人：{{ data1.name }}</div>
          <div>电话:{{ data1.tel }}</div>
        </div>
        <div class="p-tb-10">
          收货地址：{{
            `${data1.province}${data1.city}${data1.county}${data1.addressDetail}`
          }}
        </div>
        <div class="orange font-s-12">(收货不便时，可选择免费待收货服务)</div>
      </div>
      <div class="pr-10"><i class="iconfont icon-youjiantou"></i></div>
    </div>
    <div>
      <img src="../../assets/images/caitiao.jpg" alt="" class="cai" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    data1: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    // 修改收获地址
    goedit() {
      this.$router.push({
        path: "/AddressView",
        query: {
          id: true,
        },
      });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.orange {
  color: rgb(238, 146, 8);
}
.cai {
  width: 100%;
  height: 5px;
}
</style>