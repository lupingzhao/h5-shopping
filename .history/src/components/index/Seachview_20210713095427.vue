<template>
  <!-- 搜索时的页面 -->
  <div class="bgc-white mt">
    <!-- 搜索记录 -->
    <div v-if="history" class="bgc-low-gray">
      <!-- 记录为空 -->
      <div v-if="historydata.length === 0">
        <van-empty description="暂无搜索记录" class="empty" />
      </div>
      <!-- 不为空 -->
      <div v-else class="p-5">
        <div class="bgc-white m-tb-10 p-10 flex jcsb">
          <div>历史记录</div>
          <div @click="localDelete('seachHistory')">清空历史记录</div>
        </div>
        <div class="flex flex-wrap">
          <div
            v-for="item in historydata"
            :key="item"
            class="bgc-white p-10 b-radius-10 his"
            @click="reSeach(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div v-else class="height-100">
      <div v-if="seachData.length === 0" class="bgc-low-gray">
        <van-empty
          class="custom-image empty"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无该商品信息"
        />
      </div>
      <div
        v-else
        v-for="(item, index) in seachData"
        :key="index"
        class="p-10 border-b m-10"
        @click="goodOne(item.id)"
      >
        <div class="flex">
          <img :src="item.image" alt="" class="seach-img" />
          <div class="m-l-10">
            <div v-html="item.name"></div>
            <div class="m-10">
              ￥{{ item.present_price }}
              &nbsp;
              <span class="del-line"> ￥{{ item.orl_price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "",
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      // 搜索历史
      history: true,
      // 数据
      historydata: [],
      seachData: [],
    };
  },
  components: {},
  methods: {
    // 获取搜索记录
    getHistroy() {
      // 获取本地存储记录
      this.historydata = JSON.parse(localStorage.getItem("seachHistory"));
    },
    //  查看详情
    goodOne(val) {
      // console.log(val);
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "1000",
      });
      // //  传递参数
      this.$router.push({
        path: "/Details",
        query: {
          id: val,
        },
      });
    },
    // 清除本地数据
    localDelete(name) {
      if (localStorage.getItem(`${name}`) === null) {
        return;
      } else {
        localStorage.removeItem(`${name}`);
      }
      this.historydata = [];
      // console.log(this.historydata);
    },
    // 点击关键字搜索
    seach(val) {
      if (!Boolean(val)) {
        Toast.fail("未输入关键字");
        this.history = true;
      } else {
        this.$api
          .search({ value: val })
          .then((res) => {
            Toast.loading({
              message: "加载中...",
              forbidClick: true,
              loadingType: "spinner",
              duration: "1000",
            });
            this.history = false;
            // console.log(res.data.list);
            this.seachData = res.data.list;
            // 关键字高亮
            this.seachData.map((a) => {
              // console.log(a);
              a.name = a.name.replace(val, `<span class="red"> ${val}<span>`);
            });
            // 存储搜索关键字
            // 添加本地储存记录
            this.$utils.saveHistory({ key: "seach", data: val });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 点击历史再次搜索
    reSeach(val) {
      this.seach(val);
      this.$emit("value", val);
    },
  },
  mounted() {
    this.getHistroy();
  },
  computed: {},
  watch: {
    value() {
      if (!this.value) {
        this.history = true;
        this.getHistroy();
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.his {
  height: 20px;
  line-height: 20px;
  margin: 5px 10px;
  background-color: rgba(59, 58, 58, 0.5);
}
.seach-img {
  width: 20%;
}
</style>