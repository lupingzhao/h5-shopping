<template>
  <div>
    <div class="p-10 t-a-c font-s-16 flex jcsb bgc-gray">
      <div><i class="iconfont icon-zuojiantou" @click="goback"></i></div>
      <div>收货地址列表</div>
      <div></div>
    </div>

    <div>
      <div v-if="list.length === 0">
        <!-- 无收获地址时 -->
        <div class="height-100">
          <van-empty
            description="未添加收货地址，去添加"
            class="empt font-s-16"
          >
          </van-empty>
        </div>
      </div>

      <!--有收货地址 -->
      <div>
        <!-- 可用地址 -->
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          :disabled-list="disabledList"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="select"
        />
        <!-- 不可用地址 -->
        <van-address-list
          v-if="disabledList.length > 0"
          v-model="chosenAddressId"
          :list="list"
          :disabled-list="disabledList"
          disabled-text="以下地址超出配送范围"
          default-tag-text="默认"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      // 默认选中地址
      chosenAddressId: "1",
      list: [],
      // 不可以地址
      disabledList: [
        //   {
        //     id: "3",
        //     name: "王五",
        //     tel: "1320000000",
        //     address: "浙江省杭州市滨江区江南大道 15 号",
        //   },
      ],
    };
  },
  components: {},
  methods: {
    // 返回
    goback() {
      this.$router.back();
    },
    // 添加地址
    onAdd() {
      this.$router.push("/EditAddress");
    },
    // 编辑地址
    onEdit(item, index) {
      console.log(item);
      // this.$Toast("编辑地址:" + index);
      this.$publicJs.go("/EditAddress", "id", JSON.stringify(item));
    },
    // 获取地址列表数据
    getAddress() {
      this.$api
        .getAddress()
        .then((res) => {
          console.log(res.address);
          this.list = res.address;

          this.list.map((a) => {
            this.$set(a, "id", a._id);
          });
          //有地址才存在有默认的id
          if (this.list.length > 0) {
            //   // 默认选中的id
            let istrue = this.list.filter((a) => {
              return a.isDefault;
            });
            this.chosenAddressId = istrue[0].id;
          }
        })
        .catch();
    },
    // 点击选中事件
    select(item) {
      // 判断是从地址管理过来还是支付页面过来
      if (localStorage.getItem("toOder")) {
        this.$router.push("/ToOrder");
        localStorage.removeItem("toOder");
        // 本地
        localStorage.setItem("oderAdderss", JSON.stringify(item));
      } else {
        return;
      }
    },
  },
  mounted() {
    this.getAddress();
  },
  computed: {},
  watch: {
    chosenAddressId(val) {
      this.AddressView = val;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>