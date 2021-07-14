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
  methods: {},
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