<template>
  <div class="dc">
    <!-- 详情 评论标签 -->
    <van-sticky :offset-top="0">
      <van-tabs v-model="active" class="tab">
        <van-tab title="商品详情"> </van-tab>
        <van-tab title="商品评论"> </van-tab>
      </van-tabs>
    </van-sticky>

    <!-- x详情  -->
    <div class="m-t-10" style="line-height: 0">
      <div v-html="detail.detail" v-if="active === 0"></div>
      <!-- 评论 -->
      <div v-else>
        <div v-if="comment.length > 0">
          <div v-for="(item, index) in comment" :key="index" class="commbox">
            <div class="flex a-i-fs width-100">
              <!-- s是否匿名 -->
              <div>
                <div v-if="item.anonymous" class="com-ing com1"></div>
                <div
                  class="com-ing"
                  v-else
                  :style="{
                    'background-image': `url(${item.user[0].avatar})`,
                  }"
                ></div>
              </div>
              <div class="m-l-10 width-100 p-5">
                <div class="flex jcsb width-100 p-tb-10">
                  <div>
                    <div v-if="item.anonymous">
                      {{ item.comment_nickname }}
                    </div>
                    <div v-else>{{ item.user[0].nickname }}</div>
                  </div>
                  <div>{{ item.comment_time }}</div>
                </div>
                <!-- 评分 -->
                <div class="m-t-10" style="color: red">
                  <van-rate v-model="item.rate" readonly />
                  {{ item.rate }}分
                </div>
              </div>
            </div>
            <!-- 内容 -->
            <div class="content">hhh {{ item.content }}</div>
          </div>
        </div>

        <div v-else class="t-a-c p-10">暂无评论</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    detail: {
      type: Object,
    },
    comment: {
      type: Array,
    },
  },
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  components: {},
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.refreshing = false;
        }
      }, 1000);
    },

    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.com-ing {
  width: 60px;
  height: 60px;
  background-size: contain;
  border-radius: 100%;
}
.commbox {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px 5px 10px;
}
.com1 {
  background: url("../../assets/images/tx.webp");
  background-size: 100%;
}
.tab {
  background-color: #fff;
}
.dc {
  padding-bottom: 5vw;
}
.content {
  margin-top: 5px;
  border-top: 1px solid rgb(214, 212, 212);
  padding: 15px 10px 15px;
}
</style>