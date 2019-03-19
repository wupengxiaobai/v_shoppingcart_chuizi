<template>
  <div class="good-item">
    <div class="item-img">
      <img
        v-for="(subItem, subIndex) in goodData.sku_info"
        :key="subIndex"
        :alt="goodData.sub_title"
        :src="subItem.ali_image"
        v-show="currentIndex===subIndex"
      >
    </div>
    <h3 class>{{ goodData.name }}</h3>
    <h6>{{ goodData.name_title }}</h6>
    <div class="params-colors">
      <ul class="colors-list">
        <li
          v-for="(subItem,subIndex) in goodData.sku_info"
          :key="subIndex"
          :class="{'active':currentIndex===subIndex}"
          @mouseenter="changeCurrentIndex(subIndex)"
        >
          <span
            :class="{'white': subItem.spec_json.image=='white','black': subItem.spec_json.image=='black','blue': subItem.spec_json.image=='blue','other': subItem.spec_json.image=='other'}"
          ></span>
        </li>
      </ul>
    </div>
    <div class="item-btns">
      <router-link
        tag="span"
        :to="'/goodDetail?goodId='+goodData.sku_info[currentIndex]['sku_id']"
        class="item-gray-btn"
      >查看详情</router-link>
      <span class="item-blue-btn" @click="addShopping(goodData.sku_info[currentIndex])">加入购物车</span>
    </div>
    <div class="item-price">
      <i>¥</i>
      <span>{{ goodData.price }}</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    goodData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    //   添加商品到购物车
    addShopping(data) {
      // this.$store.commit("shoppingOperation", {data, type:'addShop'});
      this.shoppingOperation({
        data,
        type: "addShop"
      });
      //  显示购物车面版
      this.carPanelOpeartion("show");
    },
    //  商品切换
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },
    ...mapMutations(["carPanelOpeartion", "shoppingOperation"])
  },
  computed: {},
  created() {}
};
</script>

<style lang="less" scoped>
.good-item {
  width: 25%;
  padding: 14px;
  .item-img {
    display: flex;
    flex-direction: column;
    img {
      height: 206px;
    }
  }
  h3 {
    line-height: 1.2;
    font-size: 16px;
    color: #424242;
    margin: 0 auto;
    font-weight: 500;
  }
  h6 {
    line-height: 1.2;
    font-size: 12px;
    font-weight: 500;
    color: #d0d0d0;
    margin: 8px auto 14px;
  }
  .params-colors {
    .colors-list {
      display: flex;
      justify-content: center;
      li {
        margin: 0 3px;
        line-height: 0;
        width: 8px;
        height: 8px;
        border: 1px solid #e5e5e5;
        border-radius: 50%;
        padding: 2px;
        display: block;
        box-sizing: content-box;
        cursor: pointer;
        &:hover {
          & > span {
            background: #5683ea;
            &.white {
              background: #fff;
            }
            &.black {
              background: #000;
            }
            &.blue {
              background: #368;
            }
            &.other {
              background: #5683ea;
            }
          }
        }
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
          background: #eee;
          border-radius: 50%;
        }
        &.active {
          span {
            background: #5683ea;
            &.white {
              background: #fff;
            }
            &.black {
              background: #000;
            }
            &.blue {
              background: #368;
            }
            &.other {
              background: #5683ea;
            }
          }
        }
      }
    }
  }
  .item-btns {
    display: none;
    // display: flex;
    justify-content: center;
    height: 60px;
    align-items: center;
    span {
      margin: 0 5px;
      width: 100px;
      height: 30px;
      font-size: 12px;
      line-height: 28px;
      border-radius: 4px;
      font-weight: 200;
      transition: all 0.1s ease;
      border: 1px solid #d5d5d5;
      background: #fff;
      cursor: pointer;
      &.item-gray-btn {
        &:hover {
          background-image: linear-gradient(#f6f6f6, #ededed);
        }
      }
      &.item-blue-btn {
        color: #fff;
        background-image: linear-gradient(#4d72de, #6189e6);
        border: 1px solid #3e61d7;
        opacity: 0.88;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .item-price {
    line-height: 60px;
    height: 60px;
    color: #f40;
    font-weight: bold;
    font-size: 18px;
  }
  &:hover {
    box-shadow: 0 0 38px rgba(0, 0, 0, 0.08) inset;
    transition: all 0.15s ease;
    & > .item-btns {
      display: flex;
    }
    & > .item-price {
      display: none;
    }
  }
}
</style>
