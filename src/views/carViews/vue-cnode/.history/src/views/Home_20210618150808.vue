<template>
  <div class=".container-pc">
    <Childleft></Childleft>

    <Childfoot></Childfoot>
  </div>
</template>

<script>
import Childleft from "../components/childleft/Childleft";
import Childfoot from "../components/childfoot/Chidfoot";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    // 注册子组件
    Childleft,
    Childfoot,
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>