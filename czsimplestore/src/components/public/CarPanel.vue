<template>
  <div class="shoppingcar">
    <div
      class="cart"
      ref="cart"
      :class="{'hover-class':carPanelShow}"
      @mouseenter="carPanelOpeartion('show')"
      @mouseleave="carPanelOpeartion('hide')"
    >
      <div class="shopppingCarWrapper" v-show="carPanelShow">
        <div class="empty" v-show="!shoppingCarData.length">
          <img src="../../assets/img/cart-empty.png" alt>
          <p>购物车为空</p>
          <p>您还没有选购任何商品，现在前往商城选购吧！</p>
        </div>
        <div class="no-empty" v-show="shoppingCarData.length">
          <div class="cart-list">
            <div class="cart-item" v-for="good in shoppingCarData" :key="good.sku_id">
              <div class="left-img">
                <img :src="good.ali_image" alt>
              </div>
              <div class="right-info">
                <p class="name">{{ good.title }}</p>
                <p class="color">{{ good.spec_json.show_name }}</p>
                <p class="buy">
                  <span class="price">￥{{ good.price }}</span>×
                  <span class="num">{{ good.count }}</span>
                </p>
              </div>
              <div class="del-btn" @click="delGoods(good)"></div>
            </div>
          </div>
          <div class="totalWrapper">
            <div class="total">
              <p class="count">
                共
                <span>{{ shoppingTotal.totalCount }}</span>件商品
              </p>
              <p class="price">
                合计:
                <span>
                  ￥
                  <span class="price">{{ shoppingTotal.totalPrice }}</span>
                </span>
              </p>
            </div>
            <router-link to="/shoppingCar" tag="div" class="go-shoppingcar">去购物车</router-link>
          </div>
        </div>
      </div>

      <!-- 小球 -->
      <transition name="ball" @beforeEnter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
        <div v-show="ball.show" class="ball" ref="ball">
          <img :src="ball.img" alt>
        </div>
      </transition>
    </div>
    <span class="numTotal">{{ shoppingTotal.totalCount }}</span>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  methods: {
    delGoods(data) {
      //   this.$store.commit("delShopping", id);
      this.shoppingOperation({ data, type: "delShop" });
    },
    // 小球动画函数
    beforeEnter(el) {
      let rect = this.ball.el.getBoundingClientRect(); //  触发目标相关值
      let cart = this.$refs["cart"].getBoundingClientRect();
      //   let ball = this.$refs["ball"].getBoundingClientRect(); //  小球
      //  初始找不到小球位置, 全部是0, 可能和display:none 有关系. 所以这里给了固定位置
      /* let x = ball.left + ball.width / 2 - (rect.left + rect.width / 2);
      let y = ball.top + ball.height / 2 - (rect.top + rect.height / 2); */
      let x = cart.left + cart.width / 2 - (rect.left + rect.width / 2) - 20;
      let y = cart.top + cart.height / 2 - (rect.top + rect.height / 2) - 20;
      el.style.transform = "translate3d(" + -x + "px," + -y + "px,0)";
    },
    enter(el, done) {
      el.offsetWidth; //  主动渲染动画
      el.style.transform = "translate3d(0,0,0)";
      el.style.transition = "1s ease";
      //  马上调用 afterEnter
      done();
    },
    afterEnter(el) {
      // 初始化小球
      this.ball.show = false;
    },
    //  vuex方法映射
    ...mapMutations(["carPanelOpeartion", "shoppingOperation"])
  },
  computed: {
    ...mapState(["shoppingCarData", "carPanelShow", "ball"]),
    ...mapGetters(["shoppingTotal"])
  }
};
</script>


<style lang="less" scoped>
.shoppingcar {
  display: flex;
  align-items: center;
  position: relative;
  .cart {
    position: relative;
    margin-left: 30px;
    width: 30px;
    height: 20px;
    background: url(../../assets/img/account-icon.png) -150px -22px;
    &.hover-class {
      background-position: -240px -22px;
      /* & > .shopppingCarWrapper {
        display: flex;
      } */
    }
    .shopppingCarWrapper {
      //   display: none;
      display: flex;
      color: #333;
      padding: 15px;
      position: absolute;
      top: 40px;
      right: -50px;
      width: 360px;
      min-height: 120px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      //   display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      .empty {
        p {
          line-height: 2;
          font-size: 12px;
          color: #ddd;
          &:nth-of-type(1) {
            color: #333;
            font-size: 16px;
            font-weight: 600;
          }
        }
      }
      .no-empty {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .cart-list {
          padding-bottom: 10px;
          .cart-item {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 10px 0;
            .del-btn {
              position: absolute;
              right: 0;
              top: 50%;
              width: 24px;
              height: 24px;
              background-image: url("../../assets/img/delete-btn-icon.jpg");
              background-position: 0 0;
              transform: translate3d(-50%, -50%, 0);
              cursor: pointer;
              &:hover {
                background-position: 0 -36px;
              }
            }
            .left-img {
              flex: 1;
              border: 1px solid #ddd;
              min-height: 60px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .right-info {
              flex: 3;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: flex-start;
              padding: 0 15px;
              font-size: 12px;
              min-height: 60px;
              .name {
                font-weight: 600;
              }
              .color {
                color: #999;
              }
              .buy {
                color: #999;
              }
            }
          }
        }
        .totalWrapper {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #eee;
          padding-top: 10px;
          .total {
            display: flex;
            flex-direction: column;
            .count {
              font-size: 12px;
              color: #999;
            }
            .price {
              font-size: 12px;
              span {
                color: #e25147;
                .price {
                  font-size: 16px;
                  font-weight: 600;
                }
              }
            }
          }
          .go-shoppingcar {
            margin: 0 5px;
            width: 100px;
            height: 30px;
            font-size: 12px;
            line-height: 28px;
            border-radius: 4px;
            color: #fff;
            background-image: linear-gradient(#4d72de, #6189e6);
            border: 1px solid #3e61d7;
            cursor: pointer;
            opacity: 0.7;
            &:hover {
              opacity: 1;
            }
          }
        }
      }
      &::before {
        content: "";
        position: absolute;
        right: 50px;
        top: 0px;
        width: 20px;
        height: 20px;
        transform: rotate(45deg) translateX(-50%);
        background: #fff;
        border-radius: 5px;
      }
      &::after {
        content: "";
        position: absolute;
        right: -100px;
        top: -24px;
        width: 200px;
        height: 40px;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        background: transparent;
        border-radius: 5px;
      }
    }
    .ball {
      overflow: hidden;
      position: absolute;
      background: #eb746b;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  span.numTotal {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    background: #eb746b;
    background-image: linear-gradient(#eb746b, #e25147);
    box-shadow: inset 0 0 1px rgba(255, 255, 255, 0.15),
      0 1px 2px rgba(255, 255, 255, 0.15);
    border-radius: 50%;
  }
}
</style>
