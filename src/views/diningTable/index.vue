<template>
  <div class="order clearfix">
      <div class="left_box">
        <ul class="dining_ul">
          <li class="dining_li">
              <div>
                <p class="ding_title">餐桌01</p>
                <p class="ding_text">4人桌</p>
              </div>
              <div class="dining_footer dining_bluecolor">
                空
              </div>
          </li>
          <li class="dining_li">
              <div>
                <p class="ding_title">餐桌01</p>
                <p class="ding_text">4人桌</p>
              </div>
              <div class="dining_footer dining_greencolor">在 用</div>
          </li>
        </ul>
      </div>
      <div class="right_box">
        
            <div class="content_title">订单详情</div>
            <div class="content_box">
                <div class="shopnav">
                  <div  class="shop_li"> 
                      <span class="shop_span shop_title">商品名</span>
                      <span class="shop_span shop_title">单价</span>
                      <span class="shop_span shop_title">数量</span>
                      <!-- <span class="shop_span shop_title">合计</span> -->
                  </div>
                  <ul  class="shop_ul">
                      <li class="shop_li" v-for="(item,label) in shopdata" :key="label">
                          <span class="shop_span">{{label}}</span>
                          <span class="shop_span"> {{item.value}}</span>
                          <span class="shop_span"> {{item.num}}</span>
                      </li>
                  </ul>
              </div>
              <div class="content_footer"> 
                <span class="left">结算金额：￥12.8</span><span class="right">就餐人数：1人</span>
              </div>
              <div class="content_btn">
                <el-button type='mini'>去结账</el-button>
              </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
          shopdata:{
              liyu:{
                num:2,
                value:3.2
              }
            }
        }
    },

    methods: {
    }
}
</script>

<style lang="less" scoped>
.order{
    height: 100%;
    width: 100%;
    display: flex;
    .left_box{
        flex: 1;
        height: 100%;
        border-right: 1px solid rgba(199, 199, 204, 0.699);
        padding: 24px;
        box-sizing: border-box;
    }
    .right_box{
       width: 600px;
        height: 100%;
        border-right:1px solid rgba(199, 199, 204, 0.699);
        border-left: 1px solid rgba(199, 199, 204, 0.699);
    }
}
.dining_ul{
  .dining_li{
      float: left;
        height: 120px;
        width: 120px;
        border: 4px solid rgba(199, 199, 204, 0.699);
        margin: 14px;
        cursor: pointer;
        position: relative;
        text-align: center;
        .dining_footer{
          position: absolute;
          bottom: 0;
          height: 32px;
          line-height: 32px;
          font-size: 16px;
          width: 100%;
          color: white;
        }
        .ding_title{
          padding: 14px 0 0px;
          font-size: 18px;
        }
        .ding_text{
          font-size: 16px;
          padding: 6px 0;
        }
        .dining_bluecolor{
            background: rgb(60, 152, 238);
        }
        .dining_greencolor{
            background: rgb(83, 179, 95);
        }

        
  }
}
.content_title{
  height: 36px;
  background: rgba(199, 199, 204, 0.699);
  line-height: 36px;
  font-weight: bold;
  padding: 0 24px;
}
.shopnav{
    padding: 24px 0;
}
.shop_ul{
    max-height: 670px;
    overflow: auto;
}
.shop_li{
        font-size: 16px;
        .shop_span{
            display: inline-block;
            width: 180px;
            text-align: center;
            margin-bottom: 14px;
        }
        .shop_title{
            font-size: 16px;
            font-weight: bold;
        }
        .shop_icon{
            cursor: pointer;
            color: #409EFF;
        }
    }
.content_footer{
  overflow: hidden;
  padding: 24px;
}
.content_btn{
  text-align: right;
  padding:0 24px;
}
</style>