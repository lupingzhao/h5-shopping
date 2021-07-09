<template>
  <div>
    <my-head>
      <template #middle> 最近收藏 </template>
    </my-head>
    <goods-card v-if="data" :data="data"></goods-card>
    <div v-else class="t-a-c p-10">暂无记录</div>
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
    };
  },
  components: { MyHead, GoodsCard },
  methods: {},
  mounted() {
    // 获取记录
    this.data = this.$utils.getHistory({ key: "collection" });
    // console.log(this.data);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>