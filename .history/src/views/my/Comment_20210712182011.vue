
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

    <div class="content">
      <van-tabs v-model="active" sticky :offset-top="20">
        <van-tab :title="title[0].name">
          <!-- 已评价 -->
          <div ref="scroll" class="pullup-wrapper">
            <div v-if="title[0].data.length > 0">
              <!-- 上滑加载更多数据 -->

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
                    @load="onload"
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
            </div>

            <div v-else class="t-a-c p-10">暂无记录</div>
          </div>
        </van-tab>
        <van-tab :title="title[1].name">
          <!-- 未评价 -->
          <div v-if="title[1].data.length > 0">
            <div
              v-for="(item1, index1) in title[1].data"
              :key="index1"
              class="goodsBox flex a-i-fs"
            >
              <div @click="goDetail('/Details', item1.cid)">
                <img
                  @onload="onload"
                  :src="item1.image_path"
                  alt=""
                  class="goodImg"
                />
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
          </div>
          <div v-else class="t-a-c p-10">暂无记录</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
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
          if (res.code === 200) {
            this.total = res.data.count;
            this.title[0].data = this.title[0].data.concat(res.data.list);
          }
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

    // 上拉
    initBscroll() {
      this.$nextTick(() => {
        this.bscroll = new BScroll(this.$refs.scroll, {
          pullUpLoad: true,
          click: true,
        });
      });
    },
    onload() {
      this.$nextTick(() => {
        this.initBscroll();
        if (this.scroll) this.scroll.refresh();
      });
    },
  },
  mounted() {
    this.alreadyEvaluated();
    this.tobeEvaluated();
    // console.log(this.title);
    // 上拉
    this.$nextTick(() => {
      if (this.scroll) {
        this.bscroll.on("pullingUp", () => {
          this.bscroll.finishPullUp();
          //关闭上拉加载功能
          this.bscroll.closePullUp();
        });
      } else {
        this.initBscroll();
      }
    });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.comment {
  height: 100%;
  overflow: hidden;
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
  .pullup-wrapper {
    overflow: hidden;
    height: 100vh;
  }
  .content {
  }
}
</style>