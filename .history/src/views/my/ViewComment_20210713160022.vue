<template>
  <div>
    <my-head>
      <template #middle>评价详情</template>
    </my-head>
    <div>请求不到数据</div>
  </div>
</template>

<script>
import MyHead from "../../components/MyHead.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      data: null,
    };
  },
  components: { MyHead },
  methods: {
    // 查询单条评论(post)
    getData() {
      this.$api
        .evaluateOne({ id: this.data.id, _id: this.data._id })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.$Toast(err.msg);
          //   console.log(err);
        });
    },
  },
  mounted() {
    this.data = this.$route.query;
    console.log(this.data);
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>