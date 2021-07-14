<template>
  <div>
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
            <div class="hq-zd" v-if="item.top">置顶</div>
            <div class="hq-f-zd" v-else-if="item.tab === 'share'">分享</div>
            <div class="hq-f-zd" v-else-if="item.tab === 'ask'">问答</div>
            <div class="hq-bt" @click="click(item.id)">
              {{ item.title }}
            </div>
          </div>
          <div class="flex">
            <div class="hq-sjc p-2">{{ sjc[index] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: null,
      now: 0,
      creatTime: 0,
      ids: null,
    };
  },
  components: {},
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

          //   若要用到请求的数据，在得到数据之后调用方法 在外部调用为空
          this.dayjs();

          // console.log(this.ids);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dayjs() {
      //   循环算插值
      //   this.list.map((a) => {
      //     console.log(dayjs(this.list.last_reply_at).valueOf());
      //   });
      this.creatTime = dayjs(this.list.last_reply_at).valueOf();
    },
    getTimeDifference(a, b) {
      let sjcz = (a - b) / 1000;
      // console.log(sjcz);
      if (sjcz < 1) {
      } else if (sjcz < 60) {
        return `${sjcz}秒之前`;
      } else if (sjcz / 60 < 60) {
        //分钟数
        return `${parseInt(sjcz / 60)}分钟之前`;
      } else if (sjcz / 3600 < 24) {
        return `${parseInt(sjcz / 3600)}个小时之前`;
      } else if (sjcz / 3600 / 24 < 30) {
        return `${parseInt(sjcz / 3600 / 24)} 天之前`;
      } else if (sjcz / 3600 / 24 / 30 < 12) {
        return `${parseInt(sjcz / 3600 / 24 / 30)} 个月之前`;
      } else if (sjcz / 3600 / 24 / 30 / 12 >= 1) {
        return `${parseInt(sjcz / 3600 / 24 / 30 / 12)} 年之前`;
      }
    },
  },

  mounted() {
    this.getData();
    // console.log(this.list); 没在请求数据里调用dayjs 就会显示null
    // 现在时间戳
    this.now = dayjs().valueOf();
  },
  computed: {
    //   时间差
    // 获取现在时间戳
    sjc() {
      return this.list.map((a) => {
        return this.getTimeDifference(this.now, this.creatTime);
      });
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
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