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
      ids: null,
    };
  },
  components: {},
  methods: {
    getData() {
      console.log(location.search);

      axios
        .get(`https://cnodejs.org/api/v1/topic/${id}`)
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
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>