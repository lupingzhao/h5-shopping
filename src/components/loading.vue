<template>
  <div class="loading">
    <div>
      <van-loading type="spinner"> 加载中...... </van-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.loading {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  //   background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>