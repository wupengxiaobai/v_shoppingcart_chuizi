<template>
  <div class="alert-wrapper">
    <div class="alert-model">
      <div class="a-header">
        <span>{{ title }}</span>
        <span class="close" @click="closeAlertModel">×</span>
      </div>
      <div class="a-content">{{ msg }}</div>
      <div class="a-footer">
        <div class="confirm">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "提示"
    },
    msg: {
      type: String,
      default: "默认 你好！handsome boy or beautiful girl. ^_^"
    }
  },
  methods: {
    closeAlertModel() {
        this.$emit('closeAlertModel');
    }
  }
};
</script>

<style lang="less" scoped>
.alert-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  background: rgba(0, 0, 0, 0.8);
  .alert-model {
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 180px;
    background: #fff;
    border-radius: 5px;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    flex-direction: column;
    .a-header {
      flex: 1;
      padding: 10px;
      font-size: 15px;
      color: #333;
      background: #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .close {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .a-content {
      flex: 6;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      box-shadow: 0 0 2px 1px #ddd;
    }
    .a-footer {
      //   flex: 1;
      padding: 5px 10px;
      background: #eee;
      display: flex;
      flex-direction: row-reverse;
      .confirm {
        width: 72px;
        line-height: 25px;
        text-align: center;
        font-size: 13px;
        color: #fff;
        border: none;
        background: rgb(25, 74, 94);
        border-radius: 5px;
        opacity: 0.66;
        cursor: pointer;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
