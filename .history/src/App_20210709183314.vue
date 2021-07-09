<template>
  <div id="app " class="app">
    <keep-alive>
      <!-- <router-view include="HeadChild,SwithAdderss" /> -->
      <!-- <router-view exclude="home" /> -->
    </keep-alive>
    <router-view></router-view>
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

<style lang='scss' >
@import "./styles/ui";
@import "./styles/common";

// 高度
html,
body,
.app {
  height: 100%;
  background-color: #f5f5f5;
}
#app {
  padding-bottom: 20px;
}
* {
  margin: 0;
  padding: 0;
}
</style>