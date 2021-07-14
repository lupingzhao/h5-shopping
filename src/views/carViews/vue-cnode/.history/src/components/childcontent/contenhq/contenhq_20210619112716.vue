<template>
  <div>
    <div class="bgc-white">
      <!-- 一行显示的内容 -->
      <div v-for="(item, index) in list" :key="index">
        <div class="hqnr jcsb">
          <div class="flex">
            <img :src="item.author.avatar_url" alt="" class="hq-img1" />
            <div class="flex lls">
              <div class="hq-z-1">{{ item.reply_count }}</div>
              <div>/</div>
              <div class="hq-z-2">{{ item.visit_count }}</div>
            </div>
            <div class="hq-zd">置顶</div>
            <div class="hq-bt" @click="click(item.id)">
              {{ item.title }}
            </div>
          </div>
          <div class="flex">
            <div class="hq-sjc p-2">1天前</div>
          </div>
        </div>
      </div>
    </div>
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
      axios
        .get("https://cnodejs.org/api/v1/topics")
        .then((res) => {
          this.list = res.data.data;
          this.ids = this.list.map((a) => {
            return a.id;
          });
          console.log(this.list);
          // console.log(this.ids);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>