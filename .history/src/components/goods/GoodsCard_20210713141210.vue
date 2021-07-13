<template>
  <!-- 商品卡片 -->
  <div class="flex jcc">
    <div class="width-100">
      <van-card
        class="card"
        v-for="(item, index) in data"
        :key="index"
        :price="item.present_price"
        :title="item.name"
        :thumb="item.image_path"
        @click="toview(item.id)"
      >
        <template #footer>
          <div class="del">
            <van-button size="mini">按钮</van-button>
          </div>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    data: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    // 去详情页
    toview(val) {
      this.$router.push({
        path: "/Details",
        query: {
          id: val,
        },
      });
    },
    // 删除记录
    del() {
      delHistoryOne({ key, value, id });
    },
  },
  mounted() {},
  computed: {},
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
  // background-color: #fff;
  font-size: 16px;
  .van-card__num {
    color: red;
  }
}
</style>