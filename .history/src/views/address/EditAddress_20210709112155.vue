<template>
  <div>
    <div class="p-10 t-a-c font-s-18 flex jcsb bgc-gray">
      <div><i class="iconfont icon-zuojiantou" @click="goback"></i></div>
      <div v-if="data">编辑收货地址</div>
      <div v-else>新增收货地址</div>
      <div></div>
    </div>
    <div class="box" v-if="data">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        :address-info="data"
      />
    </div>
    <van-address-edit
      v-else
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import area from "../../lip/area";
export default {
  name: "",
  props: {},
  data() {
    return {
      // 选择时出现的地区
      areaList: area,
      AddressInfo: {},
      data: null,
    };
  },
  components: {},
  methods: {
    // 返回
    goback() {
      this.$router.back();
    },
    // 保存的事件
    onSave(AddressInfo) {
      let args;
      // 是否有传值 修改 还是新建
      if (this.data) {
        args = {
          name: AddressInfo.name,
          tel: AddressInfo.tel,
          isDefault: AddressInfo.isDefault,
          addressDetail: AddressInfo.addressDetail,
          province: AddressInfo.province,
          city: AddressInfo.city,
          county: AddressInfo.county,
          address: `${AddressInfo.province}${AddressInfo.city}${AddressInfo.county}${AddressInfo.addressDetail}`,
          areaCode: AddressInfo.areaCode,
          id: this.data.id,
        };
      } else {
        args = {
          name: AddressInfo.name,
          tel: AddressInfo.tel,
          isDefault: AddressInfo.isDefault,
          addressDetail: AddressInfo.addressDetail,
          province: AddressInfo.province,
          city: AddressInfo.city,
          county: AddressInfo.county,
          address: `${AddressInfo.province}${AddressInfo.city}${AddressInfo.county}${AddressInfo.addressDetail}`,
          areaCode: AddressInfo.areaCode,
        };
      }

      this.$api
        .postAddress({ ...args })
        .then((res) => {
          this.$Toast(res.msg);
          this.$publicJs.go("/AddressView");
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击删除的按钮
    onDelete() {
      this.$api
        .deleteAddress({ id: this.data.id })
        .then((res) => {
          this.$Toast(res.msg);
          this.$publicJs.go("/AddressView");
        })
        .catch();
    },
  },
  mounted() {
    this.data = JSON.parse(this.$route.query.id);
    // console.log(this.data);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  transform: translateY(10%);
}
</style>