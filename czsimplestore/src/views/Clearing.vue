<template>
  <div class="clearing">
    <Header/>
    <!-- 地址选择部分 -->
    <div class="session1">
      <div class="title">收货地址</div>
      <ul class="address">
        <div
          class="address-item"
          :class="{'active': item.default}"
          v-for="(item,index) in receiveInfo"
          :key="index"
          @click="changeDefaultAddress(index)"
        >
          <div class="name">{{ item.name }}</div>
          <div class="phone">{{ item.phone }}</div>
          <div class="address_1">{{ item.province }} {{ item.city }} {{ item.county }}</div>
          <div class="address_2">{{ item.add }}</div>
          <div class="is_default" v-if="item.default">√</div>
        </div>
        <div class="add-address" @click="addAddress">
          <span>＋</span>
          <span>使用新地址</span>
        </div>
      </ul>
    </div>
    <!-- 发票部分 -->
    <div class="session2 invoice">
      <div class="title">发票信息</div>
      <div class="i-main">
        <div class="m-main">
          <div class="m-type">发票类型: 电子发票</div>
          <div class="m-from">
            发票抬头:
            <label for="invoice-type1" @click="changeInvoice('hide')">
              <input type="radio" checked name="invo-type" id="invoice-type1">个人
            </label>
            <label for="invoice-type2" @click="changeInvoice('show')">
              <input type="radio" name="invo-type" id="invoice-type2">单位
            </label>
            <input
              v-show="invoice.show"
              v-model="invoice.name"
              type="text"
              name="invoice-text"
              placeholder="请填写公司发票抬头"
            >
          </div>
          <div class="m-content">发票内容: 购买商品明细</div>
        </div>
        <div class="m-footer">电子发票是税务局认可的有效收付款凭证，可作为售后服务凭据。电子发票打印后可以用于企业报销。</div>
      </div>
    </div>
    <!-- 账单部分 -->
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
        <div class="pay" @click="submitOrderOperation">提交订单</div>
      </div>
    </div>
    <!-- 地址添加pop -->
    <AddressPop ref="pop"/>
  </div>
</template>


<script>
import "assets/tools.js";
import Header from "components/public/Header.vue";
import AddressPop from "components/public/AddressPop.vue";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      shoppingCarCheckedData: [],
      invoice: {
        name: "个人",
        show: false
      }
    };
  },
  methods: {
    //   提交订单操作
    submitOrderOperation() {
      // 提交阻断
      if (this.invoice.show && !this.invoice.name) return;
      // 订单数据
      let selectShoppingData = this.shoppingCarCheckedData;
      // 默认的收货地址
      let selectAddress = this.getDefaultShoppingAddress;
      //  发票数据
      let invoice = this.invoice;
      //  价值数据
      let totalAbout = this.shoppingCarCheckboxCheckedTotal;
      let freight = this.freight;
      //  时间数据
      let time = new Date().Format("yyyy-MM-dd hh:mm:ss.S");
      let saveData = {
        orderId: +new Date(),
        selectShoppingData,
        selectAddress,
        invoice,
        totalAbout,
        freight,
        time
      };
      // 保存数据
      this.shoppingOrderSave(saveData);
      // 跳转付款页面
      this.$router.push("/payment?orderId=" + saveData.orderId);
    },
    //   展示地址添加弹出框
    addAddress() {
      console.log(this.$refs["pop"]);
      this.$refs["pop"].showPop();
    },
    //    发票类型选择
    changeInvoice(type) {
      if (type == "hide") {
        this.invoice.show = false;
        this.invoice.name = "个人";
      } else {
        this.invoice.show = true;
        this.invoice.name = "";
      }
    },
    //  处理默认地址的修改
    changeDefaultAddress(index) {
      this.changeDefaultAddress(index);
    },
    //  操作购物车
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
    },
    ...mapMutations(["changeDefaultAddress", "shoppingOrderSave"])
  },
  components: {
    Header,
    AddressPop
  },
  computed: {
    //   运费计算
    freight() {
      let freight =
        this.shoppingCarCheckboxCheckedTotal.totalPriceChecked > 88 ? 0 : 8;
      return freight;
    },
    ...mapState(["shoppingCarData", "receiveInfo"]),
    ...mapGetters([
      "shoppingCarCheckboxCheckedTotal",
      "getDefaultShoppingAddress"
    ])
  },
  created() {
    //   处理构建购物车选中商品数据
    this.operationShoppingChecked();
  }
};
</script>


<style lang="less" scoped>
.clearing {
  .session1,
  .session2,
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
      background: #f5f5f5;
      background: linear-gradient(#fff, #f5f5f5);
      z-index: 10;
    }
  }
  .session1 {
    .address {
      padding-bottom: 20px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      & > div {
        margin-top: 20px;
        margin-left: 20px;
        width: 23%;
        height: 160px;
        font-size: 14px;
        color: #999;
        display: flex;
        flex-direction: column;
        background: #fafafa;
        border: 1px solid #e5e5e5;
        cursor: pointer;
      }
      .address-item {
        position: relative;
        padding: 12px;
        align-items: flex-start;
        justify-content: space-around;
        &:hover {
          background: #fff;
          border-color: #6a8fe5;
        }
        &.active {
          background: #fff;
          border-color: #6a8fe5;
        }
        .name {
          font-size: 16px;
          color: #666;
        }
        .is_default {
          position: absolute;
          font-size: 22px;
          right: 12px;
          top: 12px;
        }
      }
      .add-address {
        justify-content: center;
        align-items: center;
        span {
          margin-bottom: 5px;
          color: #999;
          &:nth-of-type(1) {
            font-size: 24px;
            font-weight: bold;
          }
        }
        &:hover {
          background: #f2f2f2;
        }
      }
    }
  }
  .session2 {
    & > div {
      padding: 20px 30px;
    }
    .i-main {
      .m-main {
        height: 100px;
        color: #666;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        margin-bottom: 15px;
        .m-from {
          label {
            margin-right: 10px;
            user-select: none;
          }
          input[type="text"] {
            padding: 0 10px;
            width: 338px;
            height: 34px;
            line-height: 34px;
            border-radius: 4px;
            border: 1px solid #ddd;
            outline: none;
            box-sizing: border-box;
          }
        }
      }

      .m-footer {
        padding-top: 15px;
        font-size: 12px;
        text-indent: 10px;
        color: #999;
        border-top: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
      }
    }
  }
  .session3 {
    margin-bottom: 50px;
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
