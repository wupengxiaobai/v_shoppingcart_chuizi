<template>
  <div class="container">
    <div class="goods-list">
      <GoodItem v-for="(good, index) in goodsData" :key="index" :goodData='good' />
    </div>
  </div>
</template>

<script>
import GoodItem from './GoodItem.vue'
export default {
  props: {
    goodsData: {
      type: Array,
      default: []
    }
  },
  components:{
      GoodItem
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
}
</style>


