<template>
  <div class="payment">
    <Header/>
    <div class="pay">
      <div class="title">支付订单</div>
      <div class="t-body">
        <p class="desc">提交订单成功</p>
        <p>
          请在
          <span>24 小时内</span> 完成支付，超时订单将自动取消。
        </p>
        <p>我们将在您完成支付后的 72 小时内发货</p>
      </div>
      <div class="t-footer">
        <div class="totalPrice">
          <span>应付金额：</span>
          <span>¥ {{ currentOrder.totalAbout.totalPriceChecked + currentOrder.freight }}</span>
        </div>
        <div class="pay" @click="paymentNow">现在支付</div>
      </div>
    </div>
    <div class="orderInfo">
      <div class="orderid">
        <span>订单编号</span>
        <div>{{ currentOrder.orderId }}</div>
      </div>
      <div class="address">
        <span>收货信息</span>
        <div>姓名： {{ currentOrder.selectAddress.name }}</div>
        <div>联系电话： {{ currentOrder.selectAddress.phone }}</div>
        <div>详细地址： {{ currentOrder.selectAddress.province }} {{ currentOrder.selectAddress.city }} {{ currentOrder.selectAddress.county }} {{ currentOrder.selectAddress.add }}</div>
      </div>
      <div class="invoice">
        <span>发票信息</span>
        <div>发票类型：电子发票</div>
        <div>发票抬头：{{ currentOrder.invoice.name }}</div>
        <div>发票内容：购买商品明细</div>
      </div>
      <div class="info">
        <div class="i-header">
          <span>商品信息</span>
          <span>单价</span>
          <span>数量</span>
          <span>小计</span>
        </div>
        <div class="i-body">
          <ul>
            <li v-for="(item,index) in currentOrder.selectShoppingData" :key="index">
              <div class="name">{{ item.title }}({{ item.spec_json.show_name }})</div>
              <div class="price">￥{{ item.price }}</div>
              <div class="num">{{ item.count }}</div>
              <div class="smallPrice">￥{{ item.price * item.count }}</div>
            </li>
          </ul>
        </div>
        <div class="i-footer">
          <span>商品总计: ￥{{ currentOrder.totalAbout.totalPriceChecked }}</span>
          <span>运费: +￥{{ currentOrder.freight }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "components/public/Header.vue";
export default {
  data() {
    return {
      currentOrder: {}
    };
  },
  methods: {
    // 支付
    paymentNow() {},
    //   获取当前订单
    getCurrentOrder() {
      let orderId = this.$route.query.orderId;
      let order = this.OrderData.filter(item => item.orderId == orderId)[0];
      this.currentOrder = order;
    }
  },
  computed: {
    ...mapState(["OrderData"])
  },
  components: {
    Header
  },
  created() {
    this.getCurrentOrder();
  }
};
</script>


<style lang="less" scoped>
.payment {
  & > .pay {
    overflow: hidden;
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
      background: #f5f5f5;
      background: linear-gradient(#fff, #f5f5f5);
      z-index: 10;
    }
    .t-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 210px;
      p {
        line-height: 2;
        font-size: 14px;
        color: #999;
        span {
          font-weight: bolder;
          color: #de4037;
        }
      }
      .desc {
        text-align: center;
        font-size: 36px;
        color: #212121;
      }
    }
    .t-footer {
      height: 90px;
      background: #fff;
      border-top: 1px solid #e9e9e9;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .pay {
        padding: 2px 32px;
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
      }
      .totalPrice {
        width: 200px;
        display: flex;
        align-items: center;
        span:nth-of-type(2) {
          font-size: 24px;
          color: #d44d44;
        }
      }
    }
  }
  .orderInfo {
    padding: 50px 0;
    margin: 0 auto;
    width: 1220px;
    text-align: left;
    & > div {
      padding: 30px 25px;
      border-top: 1px solid #d5d5d5;
      span {
        display: inline-block;
        margin-bottom: 17px;
        font-size: 14px;
        font-weight: bolder;
        color: #333;
      }
      div {
        color: #666;
      }
    }
    .info {
      .i-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #d5d5d5;
        span {
          text-align: center;
          &:nth-of-type(1) {
            text-align: left;
            flex: 4;
          }
          &:nth-of-type(2) {
            flex: 1;
          }
          &:nth-of-type(3) {
            flex: 1;
          }
          &:nth-of-type(4) {
            flex: 1;
          }
        }
      }
      .i-body {
        width: 100%;
        li {
          width: 100%;
          height: 80px;
          display: flex;
          flex-direction: row;
          align-items: center;
          text-align: center;
          border-bottom: 1px solid #d5d5d5;
          .name {
            flex: 4;
            text-align: left;
          }
          .price {
            flex: 1;
          }
          .num {
            flex: 1;
          }
          .smallPrice {
            flex: 1;
          }
        }
      }
      .i-footer {
        padding: 30px 25px;
        display: flex;
        flex-direction: column;
        span {
          text-align: right;
          &:last-child {
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
