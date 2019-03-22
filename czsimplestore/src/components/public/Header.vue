<template>
  <div class="header">
    <div class="container">
      <div class="logo"></div>
      <div class="nav">
        <router-link tag="span" to="/index">在线商城</router-link>
        <router-link tag="span" to="/navlink">坚果Pro</router-link>
        <router-link tag="span" to="/navlink">Smartisan M1/M1L</router-link>
        <router-link tag="span" to="/navlink">Smartisan OS</router-link>
        <router-link tag="span" to="/navlink">喜欢云</router-link>
        <router-link tag="span" to="/navlink">应用下载</router-link>
        <router-link tag="span" to="/navlink">官方论坛</router-link>
      </div>
      <div class="right_bar">
        <div class="user">
          <dl class="user-wrapper">
            <dt class="user-info">
              <span class="avatar"></span>
              <span>+86 138****9453</span>
            </dt>
            <dd class="order">
              <router-link to="/account/order">我的订单</router-link>
            </dd>
            <dd class="address">
              <router-link to="/account/address">收货地址</router-link>
            </dd>
            <dd class="logout">
              <a href="javascript:;">退出</a>
            </dd>
          </dl>
        </div>
        <!-- 购物车组件 -->
        <CarPanel/>
      </div>
    </div>
  </div>
</template>

<script>
import CarPanel from "components/public/CarPanel.vue";
export default {
  components: {
    CarPanel
  }
};
</script>


<style lang="less" scoped>
.header {
  position: relative;
  z-index: 999;
  height: 100px;
  color: #fff;
  background: #333;
  display: flex;
  justify-content: center;
  font-size: 14px;
  .logo {
    width: 50px;
    height: 50px;
    background: url("../../assets/img/global-logo.png");
  }
  .nav {
    span {
      padding: 0 25px;
      text-align: center;
      color: #999999;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
  .right_bar {
    position: relative;
    width: 159px;
    height: 20px;
    display: flex;
    &::before {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 1px;
      height: 100%;
      background: #999999;
    }
    .user {
      position: relative;
      margin-left: 40px;
      width: 20px;
      height: 20px;
      background: url("../../assets/img/account-icon.png") -155px 0;
      background-clip: content-box;
      &:hover {
        background-position: -245px 0px;
        & > .user-wrapper {
          display: block;
        }
      }
      .user-wrapper {
        display: none;
        position: absolute;
        top: 40px;
        left: 50%;
        width: 168px;
        background: #fff;
        transform: translateX(-50%);
        border-radius: 8px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        &::before {
          content: "";
          position: absolute;
          left: 48%;
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
          left: 48%;
          top: -20px;
          width: 100px;
          height: 40px;
          transform: translateX(-50%);
          background: transparent;
          border-radius: 5px;
        }
        dt.user-info {
          display: flex;
          flex-direction: column;
          padding: 15px 0;
          span {
            color: #333;
          }
          span.avatar {
            display: block;
            position: relative;
            margin: 0 auto;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background-color: #ddd;
            margin-bottom: 8px;
          }
        }
        dd {
          a {
            display: block;
            position: relative;
            line-height: 44px;
            height: 44px;
            font-size: 12px;
            color: #616161;
            border-top: 1px solid #f5f5f5;
            text-decoration: none;
            &:hover {
              background: #fafafa;
            }
            &::before {
              background: url(../../assets/img/account-icon.png) no-repeat;
              background-size: 240px 107px;
              content: " ";
              display: block;
              position: absolute;
              left: 22px;
              top: 50%;
              width: 20px;
              height: 20px;
              margin-top: -8px;
            }
          }
          &:nth-of-type(1) a::before {
            background-position: 0 -44px;
          }
          &:nth-of-type(2) a::before {
            background-position: -20px -44px;
          }
          &:nth-of-type(3) a::before {
            background-position: -20px -84px;
          }
          &:nth-of-type(4) a::before {
            background-position: 0 -64px;
          }
          &:nth-of-type(5) a::before {
            background-position: -20px -64px;
          }
          &:nth-of-type(6) a::before {
            background-position: 0 -84px;
          }
        }
      }
    }
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

