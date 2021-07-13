
<template>
  <div class="comment">
    <!-- 所有评论 -->
    <div class="p-10 t-a-c font-s-16 flex jcsb">
      <div><i class="iconfont icon-zuojiantou" @click="goback"></i></div>
      <div>评价中心</div>
      <div></div>
    </div>
    <div>
      <img src="../../assets/images/evaluate.jpg" alt="" class="img" />
    </div>

    <van-tabs v-model="active" sticky :offset-top="20">
      <van-tab v-for="(item, index) in title" :title="item.name" :key="index">
        <!-- 评价订单 -->
        <van-pull-refresh v-model="refreshing">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad(index)"
          >
            <div
              v-for="(item1, index1) in item.data"
              :key="index1"
              class="goodsBox flex a-i-fs"
            >
              <!-- 已评价 -->
              <div v-if="index === 0">
                <div v-if="item1" class="flex a-i-fs">
                  <div @click="goDetail('/Details', item1.cid)">
                    <img
                      :src="item1.goods[0].image_path"
                      alt=""
                      class="goodImg"
                    />
                  </div>
                  <div>
                    <div>{{ item1.goods[0].name }}</div>

                    <div class="p-tb-10 ellipsis">
                      详情： {{ item1.content }}
                    </div>
                    <div
                      class="flex share gray"
                      @click.stop="
                        view('/ViewComment', item1.cid, item1.goods[0]._id)
                      "
                    >
                      <i class="iconfont icon-pingjia"></i>
                      <div class="pl-10">查看评价</div>
                    </div>
                  </div>
                </div>
                <div v-else class="t-a-c p-10">暂无记录</div>
              </div>

              <!-- 未评价 -->
              <div v-if="index === 1">
                <div v-if="item" class="flex a-i-fs">
                  <div @click="goDetail('/Details', item1.cid)">
                    <img :src="item1.image_path" alt="" class="goodImg" />
                  </div>
                  <div>
                    <div>{{ item1.name }}</div>

                    <div
                      class="flex share red"
                      @click="go('/PublishComment', item1)"
                    >
                      <i class="iconfont icon-pingjia"></i>
                      <div class="pl-10">评论晒单</div>
                    </div>
                  </div>
                </div>
                <div v-else class="t-a-c p-10">暂无记录</div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      title: [
        {
          name: "已评价",
          data: [],
        },
        {
          name: "待评价",
          data: [],
        },
      ],
      active: 1,
      page: 1,
    };
  },
  components: {},
  methods: {
    onLoad(val) {
      console.log(val);
      this.page++;
      // 未评价
      if (val === 1) {
        setTimeout(() => {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }

          this.$api
            .tobeEvaluated({ page: this.page })

            .then((res) => {
              console.log(this.page);
              this.title[1].data = res.data.list;
            })
            .catch();

          this.loading = false;

          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 1000);
      }
    },

    // 返回
    goback() {
      this.$router.back();
    },
    // 已评价
    alreadyEvaluated() {
      this.$api
        .alreadyEvaluated()
        .then((res) => {
          this.title[0].data = res.data.list;
        })
        .catch();
    },
    // 未评价
    tobeEvaluated() {
      this.$api
        .tobeEvaluated({ page: 1 })
        .then((res) => {
          this.title[1].data = res.data.list;
        })
        .catch();
    },
    //跳转
    go(val, value) {
      this.$publicJs.go(val, "id", JSON.stringify(value));
    },
    // 查看
    view(path, cid, _id) {
      this.$router.push({
        path: path,
        query: {
          id: cid,
          _id: _id,
        },
      });
    },
    // 去详情
    goDetail(val, value) {
      this.$publicJs.go(val, "id", value);
    },
  },
  mounted() {
    this.alreadyEvaluated();
    this.tobeEvaluated();
    // console.log(this.title);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.comment {
  .img {
    width: 100%;
    height: 250px;
  }
  .goodsBox {
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    height: 100px;
    .goodImg {
      width: 80px;
    }
    .share {
      width: 100px;
      text-align: center;

      font-style: 12px;
      padding: 5px 10px;

      border-radius: 10px;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .red {
      color: red;
      border: 1px solid red;
    }
    .gray {
      color: gray;
      border: 1px solid gray;
    }
  }
}
</style>