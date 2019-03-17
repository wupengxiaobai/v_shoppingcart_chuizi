<template>
  <div class="container">
    <div class="order-wrapper">
      <div class="active">综合排序</div>
      <div>销量排序</div>
      <div>价格低到高</div>
      <div>价格高到低</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
</style>

<style lang="less" scoped>
.order-wrapper {
  display: flex;
  align-items:center;
  height: 60px;
  div {
    position: relative;
    margin: 0 20px;
    font-size: 12px;
    color: #999;
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      width: 2px;
      height: 2px;
      background-color: #999;
      top: 50%;
      right: -10px;
    }
    &:last-child::after {
      background-color: transparent;
    }
    &:hover {
      color: #5683ea;
    }
    &.active {
      color: #5683ea;
    }
  }
}
</style>
