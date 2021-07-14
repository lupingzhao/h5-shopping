<template>
  <div>
    <!-- 底部 foot -->
    <div class="w1 font-s-14 foot">
      <div class="w jcs font-s-14">
        <div class="flex">
          <div class="mr-10 shou-xhx rss">RSS</div>
          <div class="line"></div>
          <div class="m-l-10 shou">源码地址</div>
        </div>
      </div>
      <div class="w foot2 m-t-5 font-s-14">
        CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js
        的技术研究。
      </div>
      <div class="w jcs a-i-fe foot2 m-t-5 font-s-14">
        服务器搭建在
        <img
          src="../../assets/images/digitalocean.png"
          alt=""
          class="foot2-img shou"
        />
        ，存储赞助商为
        <img src="../../assets/images/qiniu.png" alt="" class="shou" />
      </div>
      <div class="w foot2 m-t-5 font-s-14 jcs">
        新手搭建 Node.js 服务器，推荐使用无需备案的
        <div class="foot3">DigitalOcean(https://www.digitalocean.com/)</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.shou-xhx {
  cursor: pointer;
  text-decoration: underline;
}
.line {
  background-color: darkgrey;
}
</style>