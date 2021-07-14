
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

    <van-tabs v-model="active" sticky :offset-top="19" @change="change">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-tab title="待评价" :badge="toTotal">
          <div
            v-for="(item1, index1) in tobeEvaluated"
            :key="index1"
            class="goodsBox flex a-i-fs"
          >
            <div @click="goDetail('/Details', item1.cid)">
              <img :src="item1.image_path" alt="" class="goodImg" />
            </div>
            <div>
              <div>{{ item1.name }}</div>

              <div class="flex share red" @click="go('/PublishComment', item1)">
                <i class="iconfont icon-pingjia"></i>
                <div class="pl-10">评论晒单</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已评价">
          <!-- 已评价 -->
          <div
            v-for="(item1, index1) in alreadyEvaluated"
            :key="index1"
            class="goodsBox flex a-i-fs"
          >
            <div @click="goDetail('/Details', item1.cid)">
              <img :src="item1.goods[0].image_path" alt="" class="goodImg" />
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
        </van-tab>
      </van-list>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      loading: false,
      finished: false,
      alreadyEvaluated: [],
      tobeEvaluated: [],
      active: 0,
      page: 1,
      total: 0,
      // 当前点击的标签
      index: 0,
      // 未评价角标
      toTotal: 0,
    };
  },
  components: {},
  methods: {
    // 返回
    goback() {
      this.$router.back();
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
    // 已评价接口
    yes() {
      this.$api
        .alreadyEvaluated(this.page)
        .then((res) => {
          this.total = res.data.count;
          this.alreadyEvaluated = this.alreadyEvaluated.concat(res.data.list);
          this.page++;

          // 数据全部加载完成
          if (this.alreadyEvaluated.length >= this.total) {
            this.finished = true;
          } else {
            // 加载状态结束
            this.loading = false;
          }
        })
        .catch();
    },
    // 未评价接口
    no() {
      this.$api
        .tobeEvaluated(this.page)
        .then((res) => {
          this.total = res.data.count;
          this.toTotal = res.data.count;
          this.tobeEvaluated = this.tobeEvaluated.concat(res.data.list);
          this.page++;
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.tobeEvaluated.length >= this.total) {
            this.finished = true;
          }
        })
        .catch();
    },
    // 评价的加载事件
    onLoad() {
      // console.log(this.index);
      if (this.page === 1) {
        if (this.index === 0) {
          this.no();
        } else {
          this.yes();
        }
      } else {
        setTimeout(() => {
          if (this.index === 0) {
            this.no();
          } else {
            this.yes();
          }
        }, 1000);
      }
    },
    //标题切换事件
    change(index) {
      this.page = 1;
      this.total = 0;
      // 当前点击的下标
      this.index = index;
      // 加载数据中
      this.loading = true;
      // 数据已全部加载完 不显示没有更多
      this.finished = false;
      this.tobeEvaluated = [];
      this.alreadyEvaluated = [];
      this.onLoad();
      // index === 0 ? this.onLoad() : this.onLoad1();
    },
  },
  mounted() {},
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
      width: fit-content;
      text-align: center;

      font-size: 12px;
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