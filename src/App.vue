<template>
  <div class="content">
    <div>测试网页</div>
    <div>{{ txt }}</div>
    <img src="./assets/logo.png" />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      txt: "测试文本",
    };
  },
};
</script>

<style>
.content {
  background-color: red;
}
</style>
