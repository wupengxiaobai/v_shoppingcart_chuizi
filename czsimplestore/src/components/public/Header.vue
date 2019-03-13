<template>
  <div class="header">
    <div class="container">
      <div class="logo"></div>
      <div class="nav">
        <router-link tag="span" to="/navlink">在线商城</router-link>
        <router-link tag="span" to="/navlink">坚果Pro</router-link>
        <router-link tag="span" to="/navlink">Smartisan M1/M1L</router-link>
        <router-link tag="span" to="/navlink">Smartisan OS</router-link>
        <router-link tag="span" to="/navlink">喜欢云</router-link>
        <router-link tag="span" to="/navlink">应用下载</router-link>
        <router-link tag="span" to="/navlink">官方论坛</router-link>
      </div>
      <div class="right_bar">
        <div class="center"></div>
        <div class="shoppingcar"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
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
    }
  }
  .right_bar {
    position: relative;
    width: 159px;
    height: 20px;
    display: flex;
    // justify-content: space-around;
    &::before {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 1px;
      height: 100%;
      background: #999999;
    }
    .center {
      margin-left: 40px;
      width: 20px;
      height: 20px;
      background: url("../../assets/img/account-icon.png") -155px 0;
    }
    .shoppingcar {
      margin-left: 30px;
      width: 30px;
      height: 20px;
      background: url(../../assets/img/account-icon.png) -150px -22px;
    }
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

