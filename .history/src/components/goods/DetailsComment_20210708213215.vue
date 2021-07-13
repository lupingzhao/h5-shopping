<template>
  <div>
    <!-- 详情 评论标签 -->
    <van-sticky :offset-top="0">
      <van-tabs v-model="active" class="tab">
        <van-tab class="tab" title="商品详情"> </van-tab>
        <van-tab class="tab" title="商品评论"> </van-tab>
      </van-tabs>
    </van-sticky>

    <!-- x详情  -->
    <div class="m-t-10">
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
                <div class="flex jcsb width-100">
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
                  <van-rate v-model="item.rate" readonly /> {{ item.rate }}分
                </div>
              </div>
            </div>
            <!-- 内容 -->
            <div class="p-5 ellipsis-4">
              {{ item.content }}
            </div>
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
    };
  },
  components: {},
  methods: {},
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
  margin: 10px 0;
  padding: 5px;
  height: 150px;
}
.com1 {
  background: url("http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg");
  background-size: contain;
}
</style>