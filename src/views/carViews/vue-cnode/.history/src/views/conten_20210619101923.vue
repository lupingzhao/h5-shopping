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
    return {};
  },
  components: {},
  methods: {
    getData() {
      let id1 = location.search;
      console.log(id1);
      axios
        .get("https://cnodejs.org/api/v1/topic/${}")
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
    console.log(location.search);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>