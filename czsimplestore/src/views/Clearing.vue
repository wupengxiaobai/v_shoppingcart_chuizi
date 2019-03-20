<template>
  <div class="clearing">
    <Header/>
    <!-- session3 -->
    <div class="session3">
      <div class="title">购物清单</div>
      <div class="t-header">
        <div>商品信息</div>
        <div>单价</div>
        <div>数量</div>
        <div>小计</div>
      </div>
      <div class="t-body">
        <div class="shop-item" v-for="(item,index) in shoppingCarCheckedData" :key="index">
          <div class="info">
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
            <span class="count">{{ item.count }}</span>
          </div>
          <div class="smalltotal">￥ {{ item.count * item.price }}</div>
        </div>
      </div>
      <div class="t-price">
        <div class="price">
          <span>￥{{ shoppingCarCheckboxCheckedTotal.totalPriceChecked }}</span>
          <span>＋￥{{ freight }}</span>
          <span>－{{ '0' }}</span>
        </div>
        <div class="tips">
          <span>商品总计：</span>
          <span>运费：</span>
          <span>现金劵：</span>
        </div>
      </div>
      <div class="t-footer">
        <div class="totalPrice">
          <span>应付金额：</span>
          <span>¥ {{ shoppingCarCheckboxCheckedTotal.totalPriceChecked + freight }}</span>
        </div>
        <div class="pay">提交订单</div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from "components/public/Header.vue";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      shoppingCarCheckedData: []
    };
  },
  methods: {
    operationShoppingChecked() {
      //    处理获得购物车选中商品
      let shoppingCarCheckedData = [];
      let shoppingCarData = this.shoppingCarData;
      shoppingCarData.forEach(item => {
        if (item.checked) {
          shoppingCarCheckedData.push(item);
        }
      });
      this.shoppingCarCheckedData = shoppingCarCheckedData;
    }
  },
  components: {
    Header
  },
  computed: {
    freight() {
      let freight =
        this.shoppingCarCheckboxCheckedTotal.totalPriceChecked > 88 ? 0 : 8;
      return freight;
    },
    ...mapState(["shoppingCarData"]),
    ...mapGetters(["shoppingCarCheckboxCheckedTotal"])
  },
  created() {
    //   处理构建购物车选中商品数据
    this.operationShoppingChecked();
  }
};
</script>


<style lang="less" scoped>
.clearing {
  .session3 {
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
      background: #fff;
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
    }
    .t-body {
      .shop-item {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #666;
        border-bottom: 1px solid #d4d4d4;
        .info {
          flex: 4;
          display: flex;
          align-items: center;
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
        }
        .smalltotal {
          flex: 1;
          font-weight: 600;
        }
      }
    }
    .t-price {
      padding: 21px 30px;
      height: 130px;
      color: rgb(102, 102, 102);
      display: flex;
      flex-direction: row-reverse;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-around;
      }
      .tips {
        flex: 0 0 100px;
      }
      .price {
        flex: 0 0 150px;
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
}
</style>
