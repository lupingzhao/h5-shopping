<template>
  <div v-if="good" class="good height-100">
    <div class="goback flex" @click="back">
      <i class="iconfont icon-zuojiantou"></i>
    </div>

    <!-- 轮播图 -->
    <van-swipe class="my-swipe img" :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="item in 2" :key="item">
        <img :src="good.image" alt="" class="img" @click="toView(item - 1)" />
      </van-swipe-item>
    </van-swipe>

    <div class="p-10">
      <div>{{ good.name }}</div>
      <div class="p-tb-10">
        <span class="font-s-18">￥{{ good.present_price }}</span> &nbsp;
        <span class="font-s-14 font-c-gray del-line"
          >￥{{ good.orl_price }}</span
        >
      </div>
      <div class="flex jcsb p-5 font-s-14 font-c-gray">
        <div>运费：0</div>
        <div>剩余：{{ good.amount }}</div>
        <details-collect :id="id" v-if="id" :good="good"></details-collect>
      </div>
      <div class="flex jcsb p-5 jcsb m-tb-10">
        <div class="flex">
          <i class="iconfont icon-dianpu"></i>
          &nbsp; 有赞的店 &nbsp;
          <div class="gf font-s-12">官方</div>
        </div>
        <div>
          进入店铺
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
    </div>
    <!-- 详情 评论 -->
    <details-comment :detail="detail" :comment="comment"></details-comment>
    <!-- foot -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="carNum"
        @click="goCar"
      />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCar()"
      />
      <van-goods-action-button type="danger" text="立即购买" @click="show1" />
    </van-goods-action>

    <!-- 遮罩层  立即购买-->
    <detaill-now v-if="show" @closed="closed" :good="good"></detaill-now>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { ImagePreview } from "vant";
import { Toast } from "vant";
import DetaillNow from "../../components/goods/DetaillNow.vue";
import DetailsComment from "../../components/goods/DetailsComment.vue";
import DetailsCollect from "../../components/goods/DetailsCollect.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      good: null,
      detail: null,
      id: this.$route.query.id,
      //商品规格
      show: false,
      isCollection: false,
      comment: null,
    };
  },
  components: { DetaillNow, DetailsComment, DetailsCollect },
  methods: {
    // 获取商品详情
    goodOne() {
      let id = this.$route.query.id;
      // console.log(id);
      this.$api
        .goodOne(id)
        .then((res) => {
          if (res.code === 200) {
            this.comment = res.goods.comment;
            this.good = res.goods.goodsOne;
            if (this.good) {
              this.detail = {
                detail: this.good.detail,
              };
              // 储存浏览记录
              this.$utils.saveHistory({ key: "look", data: this.good });
            } else {
              this.$Toast("商品出走中......");
              this.$router.push("/");
            }
          } else {
            Toast.loading({
              message: "加载失败",
              forbidClick: true,
              loadingType: "spinner",
              duration: "1000",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 去购物车
    goCar() {
      this.$router.push("/CarViews");
    },
    //   返回
    back() {
      this.$router.back();
    },
    // 图片预览
    toView(val) {
      ImagePreview({
        images: [this.good.image, this.good.image],
        closeable: true,
        startPosition: val,
      });
    },
    // next的方法
    addcars() {
      Dialog.confirm({
        title: "加入购物车",
        message: "确认将该商品加入购物车",
      })
        .then(() => {
          this.$api
            .addShop({
              id: this.good.id,
            })
            .then((res) => {
              Toast.success("加入购物车成功");
              // 请求购物车数据
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    //添加购物车 公共方法
    addCar() {
      this.$utils.checkLogin({ key: "nickname", next: this.addcars });
    },
    // 购物车数据
    getData() {
      this.$api
        .getCard()
        .then((res) => {
          // console.log(res);
          if (res.code === 200) {
            this.$store.commit("setCarNum", res.shopList.length);
            localStorage.setItem("carNum", res.shopList.length);
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    // 立即购买
    show1() {
      this.show = true;
    },
    // 关闭弹窗
    closed(val) {
      this.show = val;
    },
  },
  mounted() {
    this.goodOne();
    this.getData();
  },
  computed: {
    // 购物车的角标
    carNum() {
      if (this.$store.state.nickname) {
        if (this.$store.state.carNum > 0) {
          return this.$store.state.carNum;
        } else {
          return;
        }
      } else {
        return;
      }
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.good {
  padding-bottom: 50px;
  .img {
    width: 100%;
  }

  .gf {
    padding: 3px;
    border-radius: 5px;
    color: azure;
    background-color: red;
  }
  .goback {
    align-content: center;

    background-color: #000;
    color: #fff;
    width: 30px;
    height: 30px;
    opacity: 0.5;
    justify-content: center;
    line-height: 30px;
    border-radius: 100%;
    margin: 10px;
    position: absolute;
    z-index: 2;
  }
}
</style>