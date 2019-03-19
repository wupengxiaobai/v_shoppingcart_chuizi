<template>
  <div class="good-detail">
    <Header/>
    <!-- 主体内容 -->
    <div class="main">
      <div class="leftImgs">
        <ul class="tabImgs">
          <li
            class="tabItem"
            :class="{'active':currentIndex === index}"
            v-for="(item,index) in imgs"
            :key="index"
            @click="currentIndex = index"
          >
            <img src="../assets/img/goods/db2.jpg" alt="没有假数据,暂时安排如此 t_t">
          </li>
        </ul>
        <div class="seeImg">
          <img src="../assets/img/goods/db3.jpg" alt>
        </div>
      </div>
      <div class="rightOther">
        <div class="title">
          我爱邓紫棋 ^_^
          <span>❤</span>
          (商品id: {{ $route.query.goodId }})
        </div>
        <div class="sub-title">
          (这里只做多个数量同时加入购物车, 以及路由切换功能)
          <br>
          {{ currentGood.sub_title}}
          <span class="price">￥199</span>
        </div>
        <div class="colors">
          <p>颜色选择：{{ currentGood.spec_json.show_name }}</p>
          <ul>
            <li
              class="colorItem"
              :class="{'active': $route.query.goodId == item.sku_id}"
              v-for="(item,index) in goodData.sku_info"
              :key="index"
              @click="changeDetail(item.sku_id)"
            >
              <img :src="item.ali_image" alt="item.title">
            </li>
          </ul>
        </div>
        <div class="number">
          <p>数量选择：</p>
          <span :class="{'disable':count<=1}" @click="changeBuyCount('decrement')">-</span>
          <i>{{ count }}</i>
          <span
            :class="{'disable':count>=maxCount || count == 0}"
            @click="changeBuyCount('increment')"
          >+</span>
        </div>
        <div class="buttons">
          <div class="addShopping" @click="addShopping(currentGood)">加入购物车</div>
          <div class="buyNow">现在购买</div>
        </div>
      </div>
    </div>
    <ShoppingAlert :msg="alertMsg"/>
  </div>
</template>

<script>
import Header from "components/public/Header.vue";
import ShoppingAlert from "components/public/ShoppingAlert.vue";
import data from "../../data.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      imgs: [{}, {}, {}, {}],
      currentIndex: 0,
      goodData: [],
      currentGood: {},
      count: 1,
      alertMsg: "已经到达库存最大值！ t_t",
      maxCount: null
    };
  },
  methods: {
    //   商品相关信息
    getGoodsData() {
      // 当前id相关商品
      let goodId = this.$route.query.goodId;
      for (let i = 0, len = data.goodsData.length; i < len; i++) {
        let item = data.goodsData[i];
        for (let j = 0; j < item["sku_info"].length; j++) {
          let subItem = item["sku_info"][j];
          if (subItem.sku_id == goodId) {
            this.goodData = item;
          }
        }
      }
      //   当前id对应商品
      this.currentGood = [].find.call(this.goodData.sku_info, item => {
        if (item.sku_id == goodId) {
          return item;
        }
      });
      //   console.log(this.goodData);
      this.count = 1;
      this.setMaxCount();
    },
    //  商品最大限度设置
    setMaxCount() {
      let maxCount = this.maxCount;
      let cItem = this.shoppingCarData.find(item => {
        if (item.sku_id == this.currentGood.sku_id) {
          return item;
        }
      });
      if (cItem) {
        maxCount = cItem["limit-num"] - cItem.count;
      } else {
        maxCount = this.currentGood["limit-num"];
      }
      if (maxCount <= 0) {
        this.count = 0;
        console.log("没有更多商品了");
      }
      this.maxCount = maxCount;
    },
    // 改变hash的query值 -> 找到指定id商品详情
    changeDetail(goodId) {
      this.$router.push({ path: "/goodDetail", query: { goodId } });
    },
    //  加/减商品数量
    changeBuyCount(type) {
      if (this.count == 0) {
        return;
      }
      if (type === "increment") {
        //  获取购物车中该商品值的数量，计算最大值
        let goodN = this.shoppingCarData.find(item => {
          if (item.sku_id == this.currentGood.sku_id) {
            return item;
          }
        });

        this.count++;
        if (this.count > this.maxCount) {
          this.count = this.maxCount;
          //   提示数量最大
          this.alertMsg = "商品数量已达到最大值， t_t";
          this.shoppingAlertShowChange("show");
        }
      } else {
        this.count--;
        if (this.count <= 0) {
          //  提示最小了，不能再加了
          this.count = 1;
          this.alertMsg = "商品数量不能小于 1 哒， t_t";
          //   this.shoppingAlertShow = true;
          this.shoppingAlertShowChange("show");
        }
      }
    },
    //   添加商品到购物车
    addShopping(data) {
      this.shoppingOperation({
        data,
        type: "addShop",
        num: this.count
      });
      //  显示购物车面版
      this.carPanelOpeartion("show");
    },
    ...mapMutations([
      "shoppingAlertShowChange",
      "shoppingOperation",
      "carPanelOpeartion"
    ])
  },
  components: {
    Header,
    ShoppingAlert
  },
  computed: {
    ...mapState(["shoppingCarData"])
  },
  watch: {
    //   侦听路由query变化，重新请求商品相应数据
    "$route.query.goodId"() {
      this.getGoodsData();
    }
  },
  created() {
    this.getGoodsData();
    //   获取该商品最大购物限度
    // this.setMaxCount();
  }
};
</script>

<style lang="less" scoped>
.good-detail {
  width: 100%;
  .main {
    margin: 20px auto;
    padding: 20px;
    width: 1200px;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0, 0, 0, 0.14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    .leftImgs {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .tabImgs {
        margin: 10px 0;
        width: 80px;
        height: 440px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .tabItem {
          width: 80px;
          height: 80px;
          border: 3px solid rgba(0, 0, 0, 0.06);
          border-radius: 5px;
          box-sizing: border-box;
          cursor: pointer;
          &.active {
            border: 3px solid rgba(0, 0, 0, 0.4);
          }
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
      }
      .seeImg {
        padding: 20px;
        width: 460px;
        height: 440px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .rightOther {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: start;
      div {
        width: 100%;
        text-align: left;
        color: #8d8d8d;
        & > p {
          margin: 5px 0;
        }
      }
      .title {
        font-size: 24px;
        line-height: 1.25;
        color: #000;
        span {
          color: #f40;
        }
      }
      .sub-title {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
        .price {
          font-size: 22px;
          font-weight: 600;
          color: #f40;
        }
      }
      .colors {
        ul {
          display: flex;
          li.colorItem {
            margin: 10px;
            overflow: hidden;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: peachpuff;
            border: 3px solid transparent;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
              vertical-align: top;
            }
            &.active {
              border: 3px solid rgba(0, 0, 0, 0.4);
            }
          }
        }
      }
      .number {
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
        color: #ccc;
        span {
          display: inline-block;
          width: 32px;
          height: 32px;
          font-size: 26px;
          line-height: 32px;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #ddd;
          box-shadow: 0 0 3px 1px #ddd;
          box-sizing: border-box;
          cursor: pointer;
          user-select: none;
          &.disable {
            cursor: not-allowed;
          }
        }
        i {
          display: inline-block;
          width: 32px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          font-style: normal;
          user-select: none;
        }
      }
      .buttons {
        .addShopping {
          display: inline-block;
          margin-right: 20px;
          width: 143px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          border-radius: 7px;
          border: 1px solid #5c81e3;
          background-color: #5c85e5;
          background-image: linear-gradient(#779ae9, #5078df);
          color: #fff;
          cursor: pointer;
          &:hover {
            transition: all 0.15s ease-out;
            box-shadow: inset 0 1px 1px #7696de, inset 0 0 2px #627dca,
              inset 0 -2px 3px #5a77c7, inset 0 0 100px rgba(48, 77, 147, 0.4);
          }
        }
        .buyNow {
          display: inline-block;
          width: 143px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          background: linear-gradient(#fff, #fafafa);
          border: 1px solid #e0e0e0;
          border-radius: 7px;
          color: #8c8c8c;
          cursor: pointer;
          &:hover {
            transition: all 0.15s ease-out;
            background: linear-gradient(#f6f6f6, #ededed);
          }
        }
      }
    }
  }
}
</style>
