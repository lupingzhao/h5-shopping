<template>
  <div class=".container-pc">
    <Childleft></Childleft>

    <div class="content">
      <div class="w p-tb-20 a-i-fs">
        <!-- 左侧盒子 -->
        <div class="width-70">
          <Contentleft></Contentleft>

          <!-- 详细内容 js获取 -->
          <div class="bgc-white">
            <!-- 一行显示的内容 -->
            <div v-for="(item, index) in list" :key="index">
              <div class="hqnr jcsb">
                <div class="flex">
                  <img :src="item.author.avatar_url" alt="" class="hq-img1" />
                  <div class="flex lls">
                    <div class="hq-z-1">{{ item.reply_count }}</div>
                    <div>/</div>
                    <div class="hq-z-2">{{ item.visit_count }}</div>
                  </div>
                  <div class="hq-zd">置顶</div>
                  <div class="hq-bt" @click="click(item.id)">
                    {{ item.title }}
                  </div>
                </div>
                <div class="flex">
                  <div class="hq-sjc p-2">1天前</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--右侧盒子 -->
        <div id="hzr" class="width-30 m-l-15">
          <Contentrigth @login="login" ref="dl"></Contentrigth>
        </div>
      </div>
    </div>

    <Childfoot></Childfoot>
  </div>
</template>

<script>
// 引用子组件
import Childleft from "../components/childleft/Childleft";
import Childfoot from "../components/childfoot/Chidfoot";
import Contentleft from "../components/childcontent/Contentleft";
// import Contentrigth from "../components/childcontent/Contentrigth";
import Contentrigth from "../components/childcontent/contentrigth/Contentrigth";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: null,
      ids: null,
    };
  },
  components: {
    // 注册子组件
    Childleft,
    Childfoot,
    Contentleft,
    Contentrigth,
  },
  methods: {
    getData() {
      axios
        .get("https://cnodejs.org/api/v1/topics")
        .then((res) => {
          this.list = res.data.data;
          this.ids = this.list.map((a) => {
            return a.id;
          });
          console.log(this.list);
          // console.log(this.ids);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(val) {
      console.log(val);
      if (val !== "") {
        this.$nextTick(() => {
          this.$refs.dl.msg = val;
        });
      }
    },
    // 点击标题跳转页面
    click(a) {
      console.log(a);
      this.$nextTick(() => {
        window.open(`./conten?id=a`, "_self");
      });
    },
  },
  mounted() {
    this.getData();
    // let user = localStorage.getItem("user");
    // console.log(user);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.content {
  background-color: rgb(225, 225, 225);
}
.hqnr {
  &:hover {
    background-color: rgb(246, 246, 246);
  }
  display: flex;
  justify-content: space-between;
  .lls {
    width: 70px;
    justify-content: center;
  }
  .hq-img1 {
    width: 30px;
    height: 30px;
    margin: 8px;
    :hover {
      cursor: pointer;
    }
  }
  .hq-z-1 {
    color: rgb(158, 120, 192);
  }
  .hq-z-2 {
    color: rgb(180, 180, 180);
  }
  .hq-zd {
    border-radius: 2px;
    color: white;
    padding: 2px;
    background-color: rgb(128, 189, 1);
    margin-right: 5px;
  }
  .hq-f-zd {
    border-radius: 2px;
    padding: 2px;
    color: rgb(153, 153, 153);
    background-color: rgb(229, 229, 229);
    margin-right: 5px;
  }
  .hq-bt {
    width: 400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .hq-sjc {
    margin-right: 5px;
    /* font-size: 12px; */
  }
}
</style>