
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

    <van-tabs v-model="active" sticky :offset-top="20" @click="onClick">
      <van-tab :title="title[0].name">
        <!-- 已评价 -->
        <div v-if="title[0].data.length > 0">
          <!-- 上滑加载更多数据 -->
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset="100"
              :immediate-check="false"
              @refresh="onRefresh"
            >
              <div
                v-for="(item1, index1) in title[0].data"
                :key="index1"
                class="goodsBox flex a-i-fs"
              >
                <div @click="goDetail('/Details', item1.cid)">
                  <img
                    :src="item1.goods[0].image_path"
                    alt=""
                    class="goodImg"
                  />
                </div>
                <div>
                  <div>{{ item1.goods[0].name }}</div>

                  <div class="p-tb-10 ellipsis">详情： {{ item1.content }}</div>
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
            </van-list>
          </van-pull-refresh>
        </div>
        <div v-else class="t-a-c p-10">暂无记录</div>
      </van-tab>
      <van-tab :title="title[1].name">
        <!-- 未评价 -->
        <div v-if="title[1].data.length > 0">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset="100"
              @refresh="onRefresh"
              :immediate-check="false"
            >
              <div
                v-for="(item1, index1) in title[1].data"
                :key="index1"
                class="goodsBox flex a-i-fs"
              >
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
            </van-list>
          </van-pull-refresh>
        </div>
        <div v-else class="t-a-c p-10">暂无记录</div>
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
      active: 0,
      page: 1,
      page1: 1,
      total: null,
      total1: null,
      index: 0,
    };
  },
  components: {},
  methods: {
    // 返回
    goback() {
      this.$router.back();
    },
    // 已评价
    alreadyEvaluated() {
      this.$api
        .alreadyEvaluated({ page: this.page })
        .then((res) => {
          this.total = res.data.count;
          this.title[0].data = this.title[0].data.concat(res.data.list);
        })
        .catch();
    },
    // 未评价
    tobeEvaluated() {
      this.$api
        .tobeEvaluated({ page: this.page1 })
        .then((res) => {
          console.log(res);
          this.total1 = res.data.count;
          this.title[1].data = this.title[1].data.concat(res.data.list);
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

    onLoad() {
      console.log(this.index);

      if (this.refreshing) {
        this.refreshing = false;
      }
      setTimeout(() => {
        if (this.index === 0) {
          this.page++;
          this.alreadyEvaluated();
          this.loading = false;
          if (this.title[0].data.length >= this.total) {
            this.finished = true;
          }
        } else {
          this.page1++;
          this.tobeEvaluated();
          this.loading = false;
          if (this.title[1].data.length >= this.total1) {
            this.finished = true;
          }
        }
      }, 2000);
    },

    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },

    onClick(name, title) {
      this.$Toast(title);
      if (title === "待评价") {
        this.index = 1;
        this.page1 = 1;
        this.tobeEvaluated();
      } else {
        this.page = 1;
        this.alreadyEvaluated();
      }
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
  .goodImg {
    width: 80px;
  }
}
</style>