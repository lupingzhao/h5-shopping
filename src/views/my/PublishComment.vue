<template>
  <div v-if="data">
    <my-head>
      <template #middle>发表评价</template>
    </my-head>
    <div class="flex p-10 bgc-white">
      <img :src="data.image_path" alt="" class="img" />
      <div>
        <div class="pf">商品评分</div>
        <div>
          <van-rate v-model="value" />
        </div>
      </div>
    </div>
    <textarea
      class="text"
      placeholder="说说你的购买感受吧..."
      v-model="text"
    ></textarea>

    <div>
      <van-checkbox v-model="checked" class="p-10">匿名</van-checkbox>
      <div class="flex jcc p-tb-10">
        <van-button type="primary" class="btn" @click="comment"
          >提交</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/MyHead.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      value: 5,
      data: null,
      checked: false,
      text: null,
    };
  },
  components: { MyHead },
  methods: {
    //   发表评论
    comment() {
      let args;

      if (this.text) {
        args = {
          id: this.data.cid,
          rate: this.value,
          content: this.text,
          anonymous: this.checked,
          _id: this.data._id,
          order_id: this.data.order_id,
          image: [],
        };
        this.$api
          .comment({ ...args })
          .then((res) => {
            this.$Toast(res.msg);
            this.$publicJs.go("/Comment");
          })
          .catch((err) => {
            this.$Toast(res.msg);
          });
      } else {
        this.$Toast("未填写评论");
      }
    },
  },
  mounted() {
    this.data = JSON.parse(this.$route.query.id);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  width: 80px;
  margin-right: 10px;
}
.pf {
  margin-bottom: 20px;
}
.text {
  width: 100%;
  height: 250px;
  border: none;
  background-color: #f5f5f5;
  text-indent: 5px;
  border-bottom: 1px solid silver;
}
.btn {
  width: 95%;
}
</style>