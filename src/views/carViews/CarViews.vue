<template>
  <div>
    <div class="p-tb-10 t-a-c font-s-16 title">购物车</div>

    <div v-if="name === null">
      <van-empty description="未登录" class="empt1 font-s-16">
        <div @click="goLogin">去登陆</div>
      </van-empty>
    </div>
    <!-- 登陆状态 -->
    <div v-else>
      <!-- 没有商品时 -->
      <div v-if="carData.length === 0" class="height-100">
        <van-empty description="未添加商品，去购物" class="empt font-s-16">
        </van-empty>
      </div>

      <!-- 有商品时 -->
      <div v-else class="box">
        <van-sticky :offset-top="0">
          <div class="flex jcsb orderhead">
            <div class="flex">
              <div class="p-lr-10">
                <input type="checkbox" @change="checkAll" v-model="checked" />
              </div>
              <div v-if="checked">取消全选</div>
              <div v-else>全选</div>
            </div>
            <div class="t-a-r p-2 width-order">
              <div class="p-tb-10 flex">
                <div class="pr-10">合计:</div>
                <div class="font-c-red width-sum t-a-l">{{ sum }}</div>
              </div>
              <div class="pr-10">
                <van-button type="primary" size="small" @click="goOrder"
                  >去结算</van-button
                >
                <van-button type="danger" size="small" @click="del"
                  >删除</van-button
                >
              </div>
            </div>
          </div>
        </van-sticky>

        <!-- 单独的商品 -->
        <div v-for="(item, index) in carData" :key="index" class="goods">
          <van-swipe-cell>
            <div class="flex">
              <div class="p-lr-10">
                <input
                  type="checkbox"
                  :name="item"
                  v-model="item.check"
                  @change="change1"
                />
              </div>
              <div class="mr-10"></div>
              <div class="flex width-100">
                <div @click="toview(item.cid)">
                  <img :src="item.image_path" alt="" />
                </div>
                <div class="p-10 width-100">
                  <div class="name">{{ item.name }}</div>
                  <div class="p-tb-10 flex jcsb">
                    <div class="font-c-red">
                      ￥ {{ item.mallPrice }}
                      <div class="font-c-red p-2 font-s-12">每人限购50份</div>
                    </div>
                    <div>
                      <van-stepper
                        v-model="item.count"
                        @change="stechange(item)"
                        max="50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <template #right>
              <div class="del-alsid" @click="delgoods(item.cid, index)">
                删除
              </div>
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup } from "vant";

import FootNav from "../../components/footnav/FootNav.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      carData: [],
      result: [],
      value: 1,
      checked: false,
      username: "",
    };
  },
  components: { FootNav, Checkbox, CheckboxGroup },
  methods: {
    // 请求购物车数据
    getCard() {
      this.$api
        .getCard()
        .then((res) => {
          this.carData = res.shopList;
          // console.log(this.carData);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    // 前去登陆
    goLogin() {
      this.$router.push("/Login");
    },
    // 全选
    checkAll() {
      // console.log(this.checked);
      this.carData.map((a) => {
        a.check = this.checked;
      });
      // console.log(this.carData);
    },

    // 单独选则
    change1() {
      this.checked = this.carData.every((a) => {
        return a.check === true;
      });
    },
    // 步进器的事件
    stechange(value) {
      // console.log(value);
      this.$api
        .editCart({
          count: value.count,
          id: value.cid,
          mallPrice: value.mallPrice,
        })
        .then((res) => {
          // console.log(res);
        })
        .catch();
    },

    //删除单个
    delgoods(val, index) {
      console.log(this.carData);
      this.$Dialog
        .confirm({
          title: "删除商品",
          message: "是否将该商品删除",
        })
        .then(() => {
          this.$api
            .deleteShop([val])
            .then((res) => {
              // console.log(res);
              // 页面显示的数据
              this.carData.splice(index, 1);
              console.log(this.carData);
              this.$store.commit("setCarNum", this.carData.length);
              localStorage.setItem(
                `${this.username}carNum`,
                this.carData.length
              );
            })
            .catch((err) => {
              // console.log(err);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 总删除
    del() {
      let ids = [];
      // 获取删除的id
      this.carData.map((a) => {
        if (a.check) {
          ids.push(a.cid);
        }
      });
      // 是否有选中商品
      if (ids.length > 0) {
        this.$Dialog
          .confirm({
            title: "删除商品",
            message: "是否将商品从购物车删除",
          })
          .then(() => {
            // on confirm
            this.$api
              .deleteShop(ids)
              .then((res) => {
                this.$Toast.success(res.msg);

                // 页面显示的数据
                this.carData = this.carData.filter((a) => {
                  return !a.check;
                });
                // 本地粗存
                this.$store.commit("setCarNum", this.carData.length);
                localStorage.setItem(
                  `${this.username}carNum`,
                  this.carData.length
                );
              })
              .catch((err) => {
                this.$Toast(err.msg);
              });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$Toast("未选中商品");
      }
    },
    // 结算
    goOrder() {
      // 先获取选中的商品
      let carDatas = this.carData.filter((a) => {
        return a.check;
      });
      // 有选中商品
      if (carDatas.length > 0) {
        // 本地储存
        localStorage.setItem("carDatas", JSON.stringify(carDatas));
        localStorage.setItem("idDirect", 0);
        this.$router.push("ToOrder");
      } else {
        this.$Toast("无选中商品");
      }
    },
    // 去详情页
    toview(val) {
      this.$router.push({
        path: "/Details",
        query: {
          id: val,
        },
      });
    },
  },
  mounted() {
    localStorage.getItem("userInfo")
      ? (this.username = JSON.parse(localStorage.getItem("userInfo")).username)
      : "";
    this.getCard();
  },
  computed: {
    name() {
      return this.$store.state.nickname;
    },
    // 计算总价
    sum() {
      let sum = 0;
      this.carData.map((a) => {
        if (a.check) {
          return (sum += a.count * a.present_price);
        }
      });
      if (sum === 0) {
        return sum;
      } else {
        return `${sum.toFixed(2)}元`;
      }
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.empt {
  transform: translateY(50%);
}
.empt1 {
  transform: translateY(30%);
}
.box {
  padding-bottom: 50px;
  .van-button--primary {
    margin-right: 15px;
  }
  .width-order {
    width: 40%;
    .width-sum {
      width: 60%;
    }
  }
}
.title {
  background-color: rgb(235, 102, 26);
  height: 20px;
}
.orderhead {
  background-color: #f5f5f5;
}
.goods {
  padding: 10px 0 10px 10px;
  background-color: #fff;
  margin-bottom: 5px;
  img {
    width: 100px;
  }
  .name {
    height: 50px;
  }
  .del-alsid {
    display: flex;
    align-items: center;
    width: 50px;
    background-color: red;
    height: 100%;
    color: white;
    justify-content: center;
    font-size: 18px;
  }
}
</style>