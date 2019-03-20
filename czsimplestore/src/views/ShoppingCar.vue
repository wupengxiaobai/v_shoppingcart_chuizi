<template>
  <div class="shoppingcar">
    <Header/>
    <div class="main">
      <div class="title">购物清单</div>
      <div class="t-header">
        <div>商品信息</div>
        <div>单价</div>
        <div>数量</div>
        <div>小计</div>
        <div>操作</div>
      </div>
      <div class="t-body">
        <div class="no-shop" v-if="!shoppingCarData.length">
          <img src="../assets/img/cart-box-empty.png" alt>
          <router-link tag="div" to="/index" class="tips">购物车空空如也，去看看宝贝们吧 ~_~</router-link>
        </div>
        <div class="shop-item" v-for="(item,index) in shoppingCarData" :key="index">
          <div class="info">
            <input
              type="checkbox"
              @click="shoppingCarCheckboxStatusChange(item.sku_id)"
              :checked="item.checked"
              class="checkOne"
            >
            <div class="img">
              <img :src="item.ali_image" :alt="item.sub_title">
            </div>
            <div class="desc">
              <div class="name">{{ item.title }}</div>
              <div class="color">{{ item.spec_json.show_name }}</div>
            </div>
          </div>
          <div class="price">￥ {{ item.price }}</div>
          <div class="number">
            <span
              class="decrement"
              :class="{'disable':item.count<=1}"
              @click="changeBuyCount({type:'decrement',goodId:item.sku_id})"
            >－</span>
            <span class="count">{{ item.count }}</span>
            <span
              class="increment"
              :class="{'disable':item.count>=item['limit-num']}"
              @click="changeBuyCount({type:'increment',goodId:item.sku_id})"
            >＋</span>
          </div>
          <div class="smalltotal">￥ {{ item.count * item.price }}</div>
          <div class="operation">
            <div class="del-btn" @click="delGoods(item)"></div>
          </div>
        </div>
      </div>
      <div class="t-footer" v-if="shoppingCarData.length">
        <div class="left">
          <label>
            <input
              type="checkbox"
              @click="shoppingCarAllCheckboxStatusChange"
              :checked="shoppingCarAllCheckboxStatus"
              name="checkAll"
            >全选
          </label>
          <span class="del-all" @click="delShoppingCarCheckedCommodity">删除选中的所有商品</span>
        </div>
        <div class="right">
          <div class="count">
            <div class="seclecdCount">
              已选择
              <span>{{ shoppingCarCheckboxCheckedTotal.totalCountChecked }}</span> 件商品
            </div>
            <div class="allCount">
              共计
              {{ shoppingTotal.totalCount }} 件商品
            </div>
          </div>
          <div class="price">
            <div class="totalPrice">
              应付总额：￥
              <span>{{ shoppingCarCheckboxCheckedTotal.totalPriceChecked }}</span>
            </div>
            <div class="tips">应付总额不含运费</div>
          </div>
          <router-link
            tag="div"
            class="pay"
            :class="{'disable':shoppingCarCheckboxCheckedTotal.totalCountChecked<=0}"
            to="/clearing"
          >现在结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "components/public/Header.vue";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    //   购物车商品添加/减少
    changeBuyCount(params) {
      this.shoppingCarInDeOperation(params);
    },
    //   操作移除商品
    delGoods(data) {
      this.shoppingOperation({ data, type: "delShop" });
    },
    ...mapMutations([
      "shoppingOperation",
      "shoppingCarCheckboxStatusChange",
      "shoppingCarAllCheckboxStatusChange",
      "delShoppingCarCheckedCommodity",
      "shoppingCarInDeOperation"
    ])
  },
  components: {
    Header
  },
  computed: {
    ...mapState(["shoppingCarData"]),
    ...mapGetters([
      "shoppingTotal",
      "shoppingCarAllCheckboxStatus",
      "shoppingCarCheckboxCheckedTotal"
    ])
  },
  created() {}
};
</script>


<style scoped lang="less">
.main {
  position: relative;
  margin: 20px auto 0;
  width: 1220px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  .title {
    position: relative;
    padding: 0 10px 0 30px;
    height: 60px;
    text-align: left;
    line-height: 60px;
    font-size: 18px;
    color: #333;
    border-bottom: 1px solid #d4d4d4;
    border-radius: 8px 8px 0 0;
    box-shadow: rgba(0, 0, 0, 0.06) 0 1px 7px;
    background: #f3f3f3;
    background: linear-gradient(#fbfbfb, #ececec);
    z-index: 10;
  }
  .t-header {
    display: flex;
    line-height: 38px;
    font-size: 12px;
    color: rgb(102, 102, 102);
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, 0.08);
    div {
      text-align: center;
    }
    div:nth-of-type(1) {
      text-indent: 2em;
      text-align: left;
      flex: 4;
    }
    div:nth-of-type(2) {
      flex: 1;
    }
    div:nth-of-type(3) {
      flex: 1;
    }
    div:nth-of-type(4) {
      flex: 1;
    }
    div:nth-of-type(5) {
      flex: 1;
    }
  }
  .t-body {
    min-height: 260px;
    .no-shop {
      min-height: 260px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tips {
        text-decoration: underline;
        color: #959595;
        &:hover {
          color: palevioletred;
        }
        cursor: pointer;
      }
      img {
        width: 180px;
      }
    }
    .shop-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #666;
      .info {
        flex: 4;
        display: flex;
        align-items: center;
        input {
          margin-left: 40px;
        }
        .img {
          margin: 20px 30px;
          width: 80px;
          height: 80px;
          border: 1px solid #ddd;
          border-radius: 2px;
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
        .desc {
          display: flex;
          flex-direction: column;
          align-items: start;
          .name {
            color: #333;
            font-size: 16px;
          }
          .color {
            padding-top: 4px;
            line-height: 17px;
            color: #999;
            font-size: 12px;
          }
        }
      }
      .price {
        flex: 1;
      }
      .number {
        flex: 1;
        .count {
          display: inline-block;
          font-size: 14px;
          line-height: 22px;
          width: 50px;
        }
        .decrement,
        .increment {
          background: #fff;
          width: 22px;
          height: 22px;
          font-size: 22px;
          line-height: 22px;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #ddd;
          -webkit-box-shadow: 0 0 3px 1px #ddd;
          box-shadow: 0 0 3px 1px #ddd;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          &.disable {
            cursor: not-allowed;
          }
        }
      }
      .smalltotal {
        flex: 1;
        font-weight: 600;
      }
      .operation {
        flex: 1;
        display: flex;
        justify-content: center;
        .del-btn {
          width: 24px;
          height: 24px;
          background-image: url("../assets/img/delete-btn-icon.jpg");
          background-position: 0 0;
          cursor: pointer;
          &:hover {
            background-position: 0 -36px;
          }
        }
      }
    }
  }
  .t-footer {
    height: 90px;
    background: linear-gradient(#fdfdfd, #f9f9f9);
    border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 12px;
      label {
        margin-left: 26px;
        color: rgb(102, 102, 102);
        input {
          vertical-align: middle;
        }
      }
      .del-all {
        margin-left: 21px;
        color: #bbb;
        cursor: pointer;
      }
    }
    .right {
      display: flex;
      width: 540px;
      .count {
        flex: 1;
        text-align: right;
        padding-right: 15px;
        border-right: 1px solid #ddd;
        .seclecdCount {
          color: #323232;
          span {
            font-size: 16px;
            font-weight: 600;
          }
        }
        .allCount {
          color: #959595;
        }
      }
      .price {
        flex: 1;
        text-align: left;
        padding-left: 15px;
        .totalPrice {
          color: #323232;
          span {
            font-size: 16px;
            font-weight: 600;
          }
        }
        .tips {
          color: #959595;
        }
      }
      .pay {
        display: block;
        padding: 2px 32px;
        margin: 0 auto;
        margin-right: 20px;
        line-height: 45px;
        color: #fff;
        background: #015e94;
        background: linear-gradient(#5598c9, #2a6da2);
        text-align: center;
        text-shadow: rgba(255, 255, 255, 0.496094) 0 1px 0;
        user-select: none;
        border-radius: 9px;
        opacity: 1;
        cursor: pointer;
        &:hover {
          opacity: 0.9;
        }
        &.disable {
          background: linear-gradient(#c3c3c3, #abaaaa);
          box-shadow: inset 0 1px 3px #ccc;
          cursor: no-drop;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>

