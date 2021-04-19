<template>
<div class="imgs">
  <router-link to='/'>返回首页</router-link>
  <img style="height:500px;width:500px;" src="@/assets/image/fukuan.png" alt="">
</div>
  
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.imgs{
  height: 100%;
  text-align: center;
  position: relative;
}
img{
  position: absolute;
  top: 50%;
  height: 50%;
  transform: translate(-50%,-50%);
}
</style>