<template>
  <div class="order">
    <div class="title">我的订单</div>
    <div v-if="!OrderData.length" class="no-shop">
      <img src="../../assets/img/cart-box-empty.png" alt>
      <router-link tag="div" to="/index" class="tips">暂无订单, 快去购物下单吧 ^_^</router-link>
    </div>
    <div class="order-list">
      <div class="order-item" v-for="(item,index) in OrderData" :key="index">
        <div class="o-header">
          <div>
            {{ item.time }}
            <span>
              订单号:
              <a href="#" class="order-id">{{ item.orderId }}</a>
            </span>
          </div>
          <div>单价</div>
          <div>数量</div>
          <div>应付总额</div>
          <div>查看详情></div>
        </div>
        <div class="o-body">
          <div class="left">
            <div
              class="good-item"
              v-for="(good,goodIndex) in item.selectShoppingData"
              :key="goodIndex"
            >
              <div class="info">
                <div class="img">
                  <img :src="good.ali_image" :alt="good.sub_title">
                </div>
                <div class="desc">
                  <div class="name">{{ good.title }}({{ good.spec_json.show_name }})</div>
                </div>
              </div>
              <div class="price">￥ {{ good.price }}</div>
              <div class="number">
                <span class="count">{{ good.count }}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="totalPrice">￥{{ item.totalAbout.totalPriceChecked + item.freight }}</div>
            <div class="payment" @click="payment(item)">现在付款</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    //付款
    payment(good) {
      console.log(good);
    }
  },
  computed: {
    ...mapState(["OrderData"])
  },
  components: {}
};
</script>

<style lang="less" scoped>
.order {
  position: relative;
  flex: 0 0 950px;
  width: 950px;
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
    background: #f5f5f5;
    background: linear-gradient(#fff, #f5f5f5);
    border-bottom: 1px solid #dcdcdc;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.06);
    z-index: 10;
  }
  .order-list {
    .order-item {
      .o-header {
        background: #eee;
        border-top: 1px solid #dbdbdb;
        border-bottom: 1px solid #dbdbdb;
        font-size: 12px;
        color: #666;
        display: flex;
        align-items: center;
        & > div {
          height: 38px;
          line-height: 38px;
          text-align: center;
          &:nth-of-type(1) {
            text-align: left;
            text-indent: 10px;
            flex: 4;
            span {
              margin-left: 50px;
            }
          }
          &:nth-of-type(2) {
            flex: 1;
          }
          &:nth-of-type(3) {
            flex: 1;
          }
          &:nth-of-type(4) {
            flex: 1;
            border-left: 1px solid #dbdbdb;
          }
          &:nth-of-type(5) {
            flex: 1;
          }
        }
      }
      .o-body {
        display: flex;
        .left {
          flex: 6;
          .good-item {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #ebebeb;
            &:last-child {
              border-color: transparent;
            }
            & > div {
              &:nth-of-type(1) {
                flex: 4;
                display: flex;
                align-items: center;
                .desc {
                  margin-left: 20px;
                }
                .img {
                  width: 80px;
                  height: 80px;
                  border: 1px solid #ebebeb;
                  box-sizing: border-box;
                  img {
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                  }
                }
              }
              &:nth-of-type(2) {
                flex: 1;
              }
              &:nth-of-type(3) {
                flex: 1;
              }
            }
          }
        }
        .right {
          flex: 2;
          padding-top: 20px;
          border-left: 1px solid #dbdbdb;
          display: flex;
          justify-content: space-around;
          .totalPrice {
            color: rgb(102, 102, 102);
          }
          .payment {
            display: inline-block;
            height: 30px;
            padding: 0 13px;
            border-radius: 4px;
            line-height: 30px;
            font-size: 12px;
            cursor: pointer;
            background: #6383c6;
            background: linear-gradient(#7ea3f5, #5a82f0);
            box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1) inset,
              0 0 0 1px rgba(0, 0, 0, 0.2) inset, 0 1px 3px rgba(0, 0, 0, 0.1);
            color: #fff;
          }
        }
      }
    }
  }
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
      width: 120px;
    }
  }
}
</style>

