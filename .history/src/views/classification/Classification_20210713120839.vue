<template>
  <div class="height-100 box">
    <div class="t-a-c p-10 bgc-white font-s-18 head">商品分类</div>

    <div class="flex a-i-fs fist">
      <!-- 一级导航 -->

      <div class="height-100">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item
            v-for="(item, index) in category"
            :key="index"
            :title="item.mallCategoryName"
          />
        </van-sidebar>
      </div>

      <!-- 二级导航 -->
      <div class="width-100 class-tabs" v-if="level2">
        <van-tabs
          v-model="active"
          swipe-threshold="4"
          @click="onClick(level2[activeKey][active].mallSubId)"
        >
          <van-tab
            v-for="(item, index) in level2[activeKey]"
            :key="index"
            :title="item.mallSubName"
          >
            <van-card
              :price="item1.present_price"
              v-for="(item1, index1) in dataList"
              :key="index1"
              :title="item1.name"
              :thumb="item1.image_path"
              :origin-price="item1.orl_price"
              @click="goodOne(item1.id)"
            />
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 底部 -->
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import FootNav from "../../components/footnav/FootNav.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      // 一级标题
      activeKey: 0,
      // 二级标题
      active: 0,
      category: null,
      level2: null,
      //页面商品数据
      dataList: null,
    };
  },
  components: { FootNav },
  methods: {
    // 分类名字
    getData() {
      this.category = JSON.parse(localStorage.getItem("category"));

      // this.category = res.data.category;
      // console.log(this.category);
      this.level2 = this.category.map((a) => {
        return a.bxMallSubDto;
      });
      // console.log(this.level2);
      // 首页是否传值过来;

      if (!Number(this.$route.query.index)) {
        this.onClick(this.level2[0][0].mallSubId);
      } else {
        this.activeKey = Number(this.$route.query.index);
        // console.log(this.activeKey);
      }
    },

    // 分类页面数据
    onClick(val) {
      this.$api
        .classify(val)
        .then((res) => {
          // console.log(res);
          if (res.code === 200) {
            this.dataList = res.dataList;
            // console.log(this.dataList);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // mallSubId;
    },
    // 一级导航切换事件 默认商品显示页面
    onChange(index) {
      this.activeKey = index;
      // console.log(index);
      let a = this.level2[this.activeKey][0].mallSubId;
      this.onClick(a);
    },
    //  查看详情
    goodOne(val) {
      // //  传递参数
      this.$router.push({
        path: "/Details",
        query: {
          id: val,
        },
      });
    },
  },
  mounted() {
    this.getData();
    // 进入页面显示在顶部
    window.scroll(0, 0);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  padding-bottom: 30px;
}
.fist {
  background-color: rgb(241, 248, 255);
  .van-sidebar-item {
    background-color: rgb(241, 248, 255);
  }
}
.red {
  color: red;
}
.class-tabs {
  overflow: auto;
  margin-left: 80px;
}

.van-sidebar {
  position: fixed;
  top: 40px;
}
.head {
  position: fixed;

  height: 49px;
}
</style>