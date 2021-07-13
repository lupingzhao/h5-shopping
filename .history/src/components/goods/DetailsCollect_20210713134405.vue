<template>
  <div class="flex jcsb coll" @click="collect">
    <div v-if="isCollection">取消收藏</div>
    <div v-else>点击收藏</div>
    &nbsp;
    <i class="iconfont icon-hongxin" :class="{ icon: isCollection }"></i>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    id: {
      type: String,
    },
    good: {
      type: Object,
    },
  },
  data() {
    return {
      isCollection: false,
    };
  },
  components: {},
  methods: {
    // 是否收藏
    collection() {
      this.$api
        .isCollection({ id: this.id })
        .then((res) => {
          // console.log(res);
          if (res.isCollection === 0) {
            this.isCollection = false;
          } else {
            this.isCollection = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击收藏
    collect() {
      // 先判断是否登陆
      if (localStorage.getItem("nickname")) {
        this.isCollection = !this.isCollection;
        if (this.isCollection) {
          this.$api
            .collection({ goods: this.good })
            .then((res) => {
              this.$Toast(res.msg);
              // 添加收藏的时候
              // 本地储存收藏的商品
              this.$utils.saveHistory({
                key: "collection",
                data: this.good,
                attr: "id",
              });
            })
            .catch();
        } else {
          this.$api
            .cancelCollection({ id: this.$route.query.id })
            .then((res) => {
              // console.log(res);
              // 本地删除记录
              this.$utils.delHistoryOne({
                key: "collection",
                value: this.good,
                id: "id",
              });
              this.$Toast(res.msg);
            });
        }
      } else {
        this.$Toast("登陆后收藏");
      }
    },
  },
  mounted() {
    // 登陆才调用是否收藏

    if (localStorage.getItem("nickname")) {
      this.collection();
    }
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.icon-hongxin {
  font-size: 20px;
}
.icon {
  color: red;
}
</style>