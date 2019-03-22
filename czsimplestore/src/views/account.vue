<template>
  <div>
    <Header/>
    <div class="a-body">
      <div class="account">
        <div class="avatar">
          <img src="../assets/img/user-avatar.png" alt="用户头像">
        </div>
        <div class="tabs">
          <router-link tag="div" to="/account/order">我的订单</router-link>
          <router-link tag="div" to="/account/address">收货地址</router-link>
        </div>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "components/public/Header.vue";
export default {
  data() {
    return {
      tabIndex: 0
    };
  },
  methods: {},
  components: {
    Header
  }
};
</script>


<style lang="less" scoped>
.a-body {
  margin: 20px auto 0;
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .account {
    overflow: hidden;
    width: 210px;
    height: 320px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #d1d1d1;
    border-color: rgba(0, 0, 0, 0.14);
    border-radius: 8px;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    .avatar {
      margin-top: 20px;
      width: 168px;
      height: 168px;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .tabs {
      width: 100%;
      height: 96px;
      display: flex;
      flex-direction: column;
      & > div {
        width: 100%;
        color: #666;
        background: #fff;
        line-height: 48px;
        flex: 1;
        cursor: pointer;
        &:hover,
        &.active {
          color: #fff;
          background: #98afee;
        }
      }
    }
  }
}
</style>
