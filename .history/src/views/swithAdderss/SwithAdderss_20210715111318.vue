<template>
  <div class="pos-rel">
    <div class="fixed">
      <div class="p-10 flex pos-rel bgc-white border-b">
        <div class="iconfont" @click="back">
          <i class="iconfont icon-zuojiantou"></i>
        </div>
        <div class="city">城市列表</div>
      </div>
      <div class="flex jcc ipt">
        <van-search v-model="value" placeholder="请输入搜索关键词" />
      </div>
    </div>

    <!-- 城市列表 -->

    <div v-if="!value" class="mt">
      <div>
        <div class="p-10 font-s-14">当前城市</div>
        <div class="bgc-white p-10">
          <van-button
            type="default"
            size="small"
            class="now"
            @click="switchAdress(now)"
          >
            {{ now }}</van-button
          >
        </div>

        <div class="p-10 font-s-14">热门城市</div>
        <div class="bgc-white flex flex-wrap jcsb p-lr-15">
          <van-button
            class="now hot"
            v-for="(item, index) in this.citys.data.hotCities"
            :key="index"
            type="default"
            size="small"
            @click="switchAdress(item.name)"
            >{{ item.name }}</van-button
          >
        </div>
      </div>

      <!-- 循环对象 -->
      <!-- <div v-for="(value, keys, index) in this.citys.data.cities" :key="index">
        <div>{{ keys }}</div>
        <div v-for="(item, index1) in value" :key="index1">{{ item.name }}</div>
      </div> -->

      <van-index-bar
        highlight-color="rgb(212, 152, 39)"
        :index-list="Object.keys(citys.data.cities)"
      >
        <div
          v-for="(keys, index) in Object.keys(citys.data.cities)"
          :key="keys"
        >
          <van-index-anchor :index="keys" />
          <van-cell
            v-for="(item1, index1) in Object.values(citys.data.cities)[index]"
            :key="index1"
            :title="item1.name"
            @click="switchAdress(item1.name)"
          />
        </div>
      </van-index-bar>
    </div>
    <!-- 搜索时出现 -->
    <div v-else class="bgc-white p-10 mt">
      <div
        v-for="item in seach"
        :key="item"
        class="p-10"
        @click="switchAdress(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import HeadChild from "../../components/HeadChild";
import city from "../../lip/city";
export default {
  name: "SwithAdderss",
  props: {},
  data() {
    return {
      citys: city,
      value: null,
      now: null,
    };
  },
  components: { HeadChild },
  methods: {
    //   返回
    back() {
      this.$router.back();
    },
    // 切换地址
    switchAdress(e) {
      // console.log(e);
      // 本地储存选着的地址，避免刷新后变化
      localStorage.setItem("address", e);
      this.$store.commit("setAddress", e);
      this.$router.push("/");
    },
  },
  mounted() {
    this.now = this.$store.state.address;

    // console.log(this.citys.data.cities);
    // console.log(Object.values(this.citys.data.cities));
  },
  computed: {
    //   搜索地址
    seach() {
      // console.log(this.value);
      let address = [];
      Object.values(this.citys.data.cities).map((a) => {
        a.map((b) => {
          //   console.log(b);
          if (b.name.includes(this.value) || b.spell.includes(this.value)) {
            address.push(b.name);
          }
        });
        // console.log(address);
      });
      // 判断包含地址是不是空
      address.length > 0 ? address : (address = ["无该地址"]);
      return address;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.fixed {
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 5;
}
.mt {
  margin-top: 35%;
}

.iconfont {
  text-align: left !important;
  padding: 10px 5px;
  font-size: 20px !important;
  margin-left: 0;
}
.city {
  font-size: 18px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.ipt {
  margin: 10px;
  background-color: #f5f5f5;
  .van-search {
    width: 90%;
    padding: 0;
    border-radius: 10px;
  }
}
.hot {
  margin: 10px 5px;
}
.now {
  width: 26%;
}
</style>