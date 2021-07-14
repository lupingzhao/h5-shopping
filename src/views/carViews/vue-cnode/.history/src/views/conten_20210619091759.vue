<template>
  <div>
    <div>123</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {
    ids: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("https://cnodejs.org/api/v1/topic/${id}")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    },
  },
  mounted() {
    console.log(11);
    console.log(this.id);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>