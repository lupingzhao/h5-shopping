<template>
 
    <van-sticky>
       <div class="box t-a-c font-s-16 flex jcsb bgc-white">
      <div><i class="iconfont icon-zuojiantou" @click="goback"></i></div>
      <div>
        <slot name="middle"></slot>
      </div>
      <div></div>
    </van-sticky>
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
  methods: {
    goback() {
      this.$router.back();
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  padding: 15px 5px;
}
</style>