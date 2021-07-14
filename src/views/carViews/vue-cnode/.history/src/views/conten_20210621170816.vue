<template>
  <div>
    <div>123</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      id: null,
    };
  },
  components: {},
  methods: {
    getData() {
      // 本地查找传递的id
      console.log(location.search);
      this.id = location.search.split("=")[1];
      console.log(this.id);
      axios
        .get(`https://cnodejs.org/api/v1/topic/${this.id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("请求错误", err);
        });
    },
  },
  mounted() {
    this.getData();

    // 接收首页传递的参数
    this.ids = this.$route.query.id;
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>