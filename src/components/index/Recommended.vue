<template>
  <!-- 推荐 -->
  <div class="container">
    <div class="p-10 bor-b">推荐</div>
    <div ref="wrapper" class="wrapper bor-b">
      <div class="flex" style="flex: 1">
        <div
          v-for="(item, index) in recommended"
          :key="index"
          class="recomen"
          @click="goodOne(item.goodsId)"
        >
          <img alt="" class="img" v-lazy="item.image" />
          <div class="ellipsis namegood">{{ item.goodsName }}</div>
          <div class="m-tb-10">
            <span>￥{{ item.mallPrice }}</span>
            <span class="del-line">￥{{ item.price }}</span>
          </div>
          <div class="flex box-car jcc">
            <div class="icon" @click.stop="addCar(item.goodsId)">
              <i class="iconfont icon-xiazai1"></i>
            </div>
            <div class="btn" @click="goodOne(item.goodsId)">查看详情</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Form, Toast } from "vant";
import { Dialog } from "vant";
export default {
  name: "",
  props: {
    recommended: {
      type: Array,
    },
  },
  data() {
    return {
      username: "",
    };
  },
  components: {},
  methods: {
    // 横向滚动
    scroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
          click: true,
          scrollX: true,
          // scrollY: false,
          // 在手机端 让手指放在滚动区域也可以竖向滚动
          eventPassthrough: "vertical",
        });
      });
    },
    //  查看详情
    goodOne(val) {
      // console.log(val);
      // //  传递参数
      this.$router.push({
        path: "/Details",
        query: {
          id: val,
        },
      });
    },
    // 添加购物车
    addCar(val) {
      // console.log(val);
      if (this.$store.state.nickname) {
        this.$api
          .addShop({
            id: val,
          })
          .then((res) => {
            Toast.success("加入购物车成功");
            // 请求购物车数据
            // 改变角标
            this.getData();

            // console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Dialog.confirm({
          title: "未登录",
          message: "是否去登陆",
        })
          .then(() => {
            this.$router.push("/Login");
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    // 滚动
    // 购物车数据
    getData() {
      this.$api
        .getCard()
        .then((res) => {
          // console.log(res);
          if (res.code === 200) {
            this.$store.commit("setCarNum", res.shopList.length);
            localStorage.setItem(`${this.username}carNum`, res.shopList.length);
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
  },
  mounted() {
    localStorage.getItem("userInfo")
      ? (this.username = JSON.parse(localStorage.getItem("userInfo")).username)
      : "";
    this.$nextTick(() => {
      this.scroll();
    });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.container {
  background-color: #fff;
  .wrapper {
    display: flex;
    overflow: hidden;
  }
  .recomen {
    padding: 10px;
    text-align: center;
    width: 40%;
    height: 230px;

    .img {
      height: 50%;
    }
    .ellipsis {
      width: 150px;
    }
    .del-line {
      text-decoration: line-through;
      padding-left: 5px;
      font-size: 12px;
      color: rgb(186, 186, 186);
    }
  }

  .box-car {
    .icon {
      height: 100%;
      padding: 10px 5px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      height: 20px;
      background-color: rgb(254, 202, 58);
      .iconfont {
        font-size: 15px !important;
      }
    }

    .btn {
      height: 20px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      font-size: 12px;
      padding: 10px;
      background-image: linear-gradient(to right, #ff6034, #ee0a24);
    }
  }
}
</style>