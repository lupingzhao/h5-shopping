<template>
  <div class="pullup">
    <div ref="scroll" class="pullup-wrapper">
      <div class="pullup-content">
        <ul class="pullup-list">
          <li v-for="i of data" :key="i" class="pullup-list-item">
            {{ i % 5 === 0 ? "scroll up 👆🏻" : `I am item ${i} ` }}
          </li>
        </ul>
        <div class="pullup-tips">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "",
  props: {},
  data() {
    return {
      pageNo: 1,
      totalPage: 0,
      isPullDown: false,
      options: {
        probeType: 3,
        pullDownRefresh: {
          threshold: 40, // 刷新时机
          stop: 30, // 回弹停留的距离
        },
        pullUpLoad: {
          threshold: 20, // 开始加载的时机
        },
        startY: 0,
      },

      isPullUpLoad: false,
      data: 30,
    };
  },
  components: {},
  methods: {
     initScroll () {
            this.myScroll = new Bscroll('.content', this.options)
            this.pullDownEvent()
            this.pullUpLoadEvent()
        },
        requestData () {
            axios.post('',{pageNo: this.pageNo, pageSize: 10}).then(res => {
                if (this.isPullDown) {
                    this.dataList = [] // 清空数据，以防重复渲染
                }
                this.dataList = res.data.list
                this.pageNo = res.pageNo
                this.totalPage = res.totalPage
                this.$nextTick(() => {
                    this.finishPull()
                })
            })
        },
        finishPulling() {
            this.myScroll.finishPullDown() // 结束下拉刷新
            this.myScroll.finishPullUp()   // 结束上拉加载更多
            this.myScroll.refresh()        // dom节点变化，重新计算better-scroll
        },
        pullDownEvent () {
            this.myScroll.on('pullingDown', () => {
                this.isPullDown = true
                console.log('下拉刷新')
                this.pageNo = 1
                this.requestData()
            })
        },
        pullUpLoadEvent () {
            this.myScroll.on('pullingUp', () => {
                console.log('上拉加载')
                if (this.pageNo < this.totalPage) {
                    this.pageNo++
                    this.requestData()
                }
            })
        }
————————————————
版权声明：本文为CSDN博主「Soil_闰土」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_43494704/article/details/84781782
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.pullup {
  height: 100%;

  .pullup-wrapper {
    height: 100%;
    padding: 0 10px;
    border: 1px solid #ccc;
    overflow: hidden;
  }

  .pullup-list {
    padding: 0;
  }

  .pullup-list-item {
    padding: 10px 0;
    list-style: none;
    border-bottom: 1px solid #ccc;
  }

  .pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>