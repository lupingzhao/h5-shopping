<template>
  <div class="contaier">
    <div v-for="(item, index) in floor" :key="index">
      <div class="jcc p-10 flex">
        <div class="floor flex jcc a-c-i">{{ index + 1 }}F</div>
        {{ item.name }}
      </div>
      <!-- 商品 -->
      <div class="box">
        <div class="flex">
          <div class="flex-1">
            <img
              :src="item.data[0].image"
              alt=""
              @click="goodOne(item.data[0].goodsId)"
            />
          </div>
          <div class="flex-1">
            <img
              :src="item.data[1].image"
              @click="goodOne(item.data[1].goodsId)"
            />
            <img
              :src="item.data[2].image"
              @click="goodOne(item.data[2].goodsId)"
            />
          </div>
        </div>

        <div class="flex">
          <div class="flex-1">
            <img
              :src="item.data[3].image"
              @click="goodOne(item.data[3].goodsId)"
            />
          </div>
          <div class="flex-1">
            <img
              :src="item.data[4].image"
              @click="goodOne(item.data[4].goodsId)"
            />
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
    floor: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    //  查看详情
    goodOne(val) {
      // console.log(val);
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "1000",
      });
      //  传递参数
      this.$router.push({
        path: "/Details",
        query: {
          id: val,
        },
      });
    },
  },
  mounted() {
    // console.log(this.floor);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.contaier {
  //   width: 100%;
  .box {
    background-color: #fff !important;
    .flex-1 {
      img {
        width: 100%;
      }
    }
  }
  .floor {
    background-color: rgb(226, 79, 21);
    width: 30px;
    height: 30px;

    margin-right: 5px;
    border-radius: 100%;
  }
}
</style>