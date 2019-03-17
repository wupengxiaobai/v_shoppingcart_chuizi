<template>
  <div class="index">
    <Header/>
    <OrderList/>
    <GoodsList :goodsData="goodsData"/>
    <ShoppingAlert/>
  </div>
</template>

<script>
import data from "../../data.js";
import Header from "components/public/Header.vue";
import OrderList from "components/public/OrderList.vue";
import GoodsList from "components/public/GoodsList.vue";
import ShoppingAlert from "components/public/ShoppingAlert.vue";
export default {
  data() {
    return {
      goodsData: []
    };
  },
  methods: {
    getGoodsData() {
      this.goodsData = data.goodsData;
    }
  },
  components: {
    Header,
    OrderList,
    GoodsList,
    ShoppingAlert
  },
  created() {
    this.getGoodsData();
  }
};
</script>
