<template>
  <div>
    <my-head>
      <template #middle> 最近浏览 </template>
    </my-head>
    <goods-card :data="data" :boolean="boolean"></goods-card>
  </div>
</template>

<script>
import GoodsCard from "../../components/goods/GoodsCard.vue";
import MyHead from "../../components/MyHead.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      data: null,
      boolean: false,
    };
  },
  components: { MyHead, GoodsCard },
  methods: {},
  mounted() {
    // 获取记录
    this.data = this.$utils.getHistory({ key: "look" });
    // console.log(this.data);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>