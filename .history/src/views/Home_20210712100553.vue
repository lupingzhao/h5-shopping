<template>
  <div class="font-s-14 p-b-10">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-sticky :offset-top="0">
        <head-child class="head flex">
          <template #left>
            <div class="flex jcsb" v-if="boo2">
              <van-loading type="spinner" v-if="boo" />
              <div class="ellipsis t-a-c mr-5" @click="getAddress">
                {{ address }}
              </div>
              <div @click="Switch">
                <i class="iconfont icon-iconfontarrows1"></i>
              </div>
            </div>
            <div class="iconfont icon-zuojiantou" v-else @click="goback"></div>
          </template>

          <template #middle>
            <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              @focus="seach1"
            />
          </template>
          <template #right>
            <div @click="seach" v-if="boo3">搜索</div>
            <div @click="delSeach" v-else>取消</div>
          </template>
        </head-child>
      </van-sticky>

      <!-- 正常页面 -->
      <div v-if="boo2">
        <!-- 轮播图 -->
        <head-index v-if="headData" :headData="headData"></head-index>

        <nav-image
          v-if="category"
          :category1="[category, advertesPicture]"
          :advertesPicture="advertesPicture"
        ></nav-image>
        <!-- 推荐 -->
        <recommended
          v-if="recommended"
          :recommended="recommended"
        ></recommended>

        <!-- 楼层商品 -->
        <index-floor v-if="floordata" :floor="floordata"></index-floor>
        <!-- 热卖 -->
        <hot-goods v-if="hotGoods" :hotGoods="hotGoods"></hot-goods>
        <!-- 底部 -->
        <foot-nav></foot-nav>
      </div>
      <!-- 搜索页面 -->
      <seachview
        v-else
        ref="seach"
        :value="value"
        @value="seachvalue"
      ></seachview>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";
import HeadChild from "../components/HeadChild";
import HeadIndex from "../components/index/HeadIndex.vue";

import IndexFloor from "../components/index/IndexFloor.vue";
import NavImage from "../components/index/NavImage.vue";
import Recommended from "../components/index/Recommended.vue";
import HotGoods from "../components/index/HotGoods";

import Seachview from "../components/index/Seachview.vue";
export default {
  name: "home",
  props: {},
  data() {
    return {
      headData: null,
      category: null,
      advertesPicture: null,
      recommended: null,
      floordata: null,
      hotGoods: null,

      city: null,
      value: null,
      // 定位
      boo: true,
      address: null,
      // 非搜索状态
      boo2: true,
      // 搜索 取消
      boo3: true,
      isLoading: false,
    };
  },
  components: {
    Recommended,
    HeadIndex,
    NavImage,
    IndexFloor,
    HeadChild,
    HotGoods,
    Seachview,
  },
  methods: {
    getData() {
      this.$api
        .index()
        .then((res) => {
          // console.log(res.data);
          this.headData = res.data.slides;
          this.category = res.data.category;
          this.advertesPicture = res.data.advertesPicture;
          this.recommended = res.data.recommend;

          this.hotGoods = res.data.hotGoods;
          this.floordata = [
            {
              name: res.data.floorName.floor1,
              data: res.data.floor1,
            },
            {
              name: res.data.floorName.floor2,
              data: res.data.floor2,
            },
            {
              name: res.data.floorName.floor3,
              data: res.data.floor3,
            },
          ];
          // 本地粗存分类的数据
          localStorage.setItem("category", JSON.stringify(this.category));
          // this.floor2 = this.floor2.push({
          //   name: res.data.floorName.floor1,
          // });
          // console.log(this.floordata);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 定位
    getAddress() {
      let _this = this;
      this.boo = true;
      this.address = null;
      AMap.plugin("AMap.Geolocation", function () {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB",
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          // console.log(data.addressComponent.city);
          _this.address = data.addressComponent.city;
          _this.boo = false;
          localStorage.removeItem("address");
        }
        function onError(data) {
          // 定位出错
          // console.log("定位出错", data);
          _this.address = "定位失败";
          _this.boo = false;
          localStorage.setItem("address", _this.address);
          // this.$store.commit('mutationHandler', payload);
        }
      });
    },
    // 位置选择
    Switch() {
      this.$router.push({
        name: "SwithAdderss",
        params: {
          now: this.address,
        },
      });
    },
    // 调用子组件的方法
    seach() {
      this.$refs.seach.seach(this.value);
      this.boo3 = false;
    },
    // 取消
    delSeach() {
      this.value = null;
      this.boo3 = true;
      this.$refs.seach.history = true;
      this.$refs.seach.getHistroy();
    },
    // 输入框获取焦点
    seach1() {
      this.boo2 = false;
    },

    // 返回
    goback() {
      this.boo2 = true;
    },
    //子组件分发的事件  点击历史记录重新给输入框赋值
    seachvalue(val) {
      this.value = val;
    },
  },
  mounted() {
    this.getData();
    // 是否有手动选择地址
    let adrs = localStorage.getItem("address");

    if (adrs !== null) {
      this.address = adrs;
      this.boo = false;
    } else {
      this.getAddress();
    }
  },
  computed: {},
  watch: {
    // 输入框的值
    value(val, oldval) {
      if (oldval !== "") {
        this.boo3 = true;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.head {
  padding: 10px 5px;
}

.empty {
  transform: translateY(50%);
}
</style>