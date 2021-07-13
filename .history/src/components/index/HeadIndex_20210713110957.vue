<template>
  <!--轮播图 -->
  <div>
    <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in headData" :key="index">
        <img :src="item.image" alt="" class="img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "indexHead",
  props: {
    headData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      value: null,
    };
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
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  padding: 10px 5px;
  background-color: #f5f5f5;
  .address {
    width: 15%;
    text-align: center;
  }
  .van-search__content {
    padding-left: 0;
    text-indent: 5px;
  }
  .van-search {
    background-color: #fff;
    padding: 0;
    padding-right: 5px;

    width: 72%;
    .van-cell {
      padding-left: 0 !important;
      background-color: #fff;
      width: 100%;
    }
  }
}
.img {
  width: 100%;
  height: 100%;
}
</style>