<template>
  <!-- 图片导航栏 -->
  <div>
    <div class="flex container">
      <div
        v-for="(item, index) in category1[0]"
        :key="index"
        class="flex-1 t-a-c"
        @click="goClass(index)"
      >
        <img :src="item.image" alt="" class="img" />
        <div>{{ item.mallCategoryName }}</div>
      </div>
    </div>
    <!-- 图片广告 -->
    <div>
      <img :src="category1[1].PICTURE_ADDRESS" alt="" class="width-100 ad" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    category1: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    goClass(val) {
      // console.log(val);
      this.$router.push({
        path: "/Classification",
        query: {
          index: val,
        },
      });
    },
  },
  mounted() {
    // console.log(this.category1);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.ad {
  margin-bottom: 10px;
}
.container {
  padding: 15px 10px 10px;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  > div {
    margin: 5px;
  }

  .img {
    width: 100%;
  }
}
</style>