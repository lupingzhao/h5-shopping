<template>
  <div class="error">
    <div class="flex jcc">
      <div class="width-80">
        <img src="../assets/images/404.jpg" alt="" class="m-c" />
        <div @click="click" class="btn m-c shou width-fit">返回首页</div>
      </div>
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
  methods: {
    click() {
      this.$publicJs.go("/");
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.error {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  img {
    width: 100%;
  }
}
</style>