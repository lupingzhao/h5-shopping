<template>
  <!-- 商品卡片 -->
  <div class="flex jcc">
    <div class="width-100" v-if="data.length > 0">
      <van-card
        class="card"
        v-for="(item, index) in data"
        :key="index"
        :title="item.name"
        :thumb="item.image_path"
        @click="toview(item.id)"
      >
        <template #price class="price">
          {{ item.present_price }}
        </template>

        <template #footer>
          <div class="del">
            <van-button size="small" class="btn" @click.stop="del(item, index)"
              >X</van-button
            >
          </div>
        </template>
      </van-card>
    </div>
    <div v-else class="t-a-c p-10">暂无记录</div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    data: {
      type: Array,
    },
    boolean: {
      type: Boolean,
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
    del(value, index) {
      // console.log(value);
      // console.log(this.boolean)
      if (this.boolean) {
        // 收藏
        // 删除本地;
        this.data.splice(index, 1);
        this.$utils.delHistoryOne({
          key: "collection",
          value: value,
          id: "id",
        });
        // 取消收藏接口
        this.$api.cancelCollection({ id: value.id });
      } else {
        // 浏览记录;
        this.data.splice(index, 1);
        this.$utils.delHistoryOne({
          key: "look",
          value: value,
          id: "id",
        });
      }
    },
  },
  mounted() {
    console.log(this.data);
  },
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
  .btn {
    border-radius: 10px;
    box-shadow: 0 0 2px;
    width: 50px;
  }
}
</style>