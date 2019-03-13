<template>
  <div class="home">
    <HelloCZ msg="Welcome to CZSimpleStore project"/>
    <router-link tag="h3" class="toIndx" to="/index">让我们开始这段旅程吧~</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloCZ from "@/components/HelloCZ.vue";

export default {
  name: "home",
  components: {
    HelloCZ
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .toIndx {
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: #368;
    }
  }
}
</style>

