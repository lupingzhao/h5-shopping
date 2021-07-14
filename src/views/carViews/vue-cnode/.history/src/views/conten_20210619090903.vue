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
    id: {
      type: String,
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
        .then((res) => {})
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