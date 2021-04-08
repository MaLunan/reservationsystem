<template>
  <div class="order">
      <div class="left_box">
          <div class="left_title">
            <div :class="['tab',active===0?'active':'']" @click="setTab(0)">
                全部
            </div>
            <div :class="['tab',active===1?'active':'']"  @click="setTab(1)">
                已记账
            </div>
            <div :class="['tab',active===2?'active':'']"  @click="setTab(2)">
                未结账
            </div>
          </div>
          <ul class="left_ul">
            <li class="left_li">
              <div class="imgbox">
                <i class="el-icon-s-platform"></i>
              </div>
              <h1 class="content_titles">流水号5</h1>
              <span class="way">堂食</span>
              <div class="remark">已结账</div>
              <div class="msg">
                  <p class="money">
                    ￥2.24
                  </p>
                  <p class="date">12:14</p>
              </div>
            </li>
            <li class="left_li">
              <div class="imgbox">
                <i class="el-icon-s-platform"></i>
              </div>
              <h1 class="content_titles">流水号5</h1>
              <span class="way">堂食</span>
              <div class="remark">已结账</div>
              <div class="msg">
                  <p class="money">
                    ￥2.24
                  </p>
                  <p class="date">12:14</p>
              </div>
            </li>
          </ul>
      </div>
      <div class="right_box">
          <div class="right_title">
            <div class="left">
              订单号：121231321465456
            </div>
            <div class="right left24">
              5人
            </div>
            <div class="right">
              堂食
            </div>
            
          </div>
          <div class="right_title top24">
            <div class="left">
              订单信息
            </div>
            <div class="right">
              <!-- <span class="datetext">支付时间 ： 2020-10-11 10:25</span> -->
              <span class="nopayment">未支付</span>
            </div>
          </div>
          <div class="content_box">
            <table>
              <tr>
                <th>商品名</th>
                <th>单价</th>
                <th>数量</th>
              </tr>
              <tr>
                <td>January</td>
                <td>$100</td>
                <td>$100</td>
              </tr>
            </table>
          </div>
          <div class="content_foot clearfix">
            <div class="left count">
              商品总计：222
            </div>
            <div class="right count">
              总计：￥121654
            </div>
          </div>
          <div class="btn_box">
            <el-button>结账</el-button>
            <el-button>退款</el-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
          active:0
        }
    },

    methods: {
      setTab(ind){
        this.active=ind
      }
    }
}
</script>

<style lang="less">
.order{
    height: 100%;
    width: 100%;
    display: flex;
    .left_box{
        width: 520px;
        height: 100%;
        border-right: 1px solid rgba(199, 199, 204, 0.699);
        padding: 24px;
        box-sizing: border-box;
    }
    .right_box{
       flex: 1;
        height: calc(100% - 112px);
        border-right:1px solid rgba(199, 199, 204, 0.699);
        border-left: 1px solid rgba(199, 199, 204, 0.699);
        background: rgba(246, 246, 247, 0.699);
        padding: 24px;
        padding-bottom: 88px;
        position: relative;
    }
}
.left_title{
  display: flex;

}
.tab{
  height: 36px;
  font-size: 16px;
  line-height: 36px;
  text-align: center;
  flex: 1;
  border:1px solid rgba(199, 199, 204, 0.699);
  cursor: pointer;
}
.active{
  border-bottom: none;
  background: #409EFF;
}
.left_ul{
  .left_li{
    height: 80px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .left_li:hover{
    background: rgba(238, 238, 240, 0.699);
  }
}
.imgbox{
  height:56px;
  width: 56px;
  border-radius: 50%;
  background:  #409EFF;
  font-size: 32px;
  text-align: center; 
  color: white;
  line-height: 56px;
  margin-left: 12px;
}
.content_titles{
  line-height: 80px;
  height: 80px;
  margin-left: 24px;
  font-weight: 400;
  font-size: 24px;
}
.way{
  display: inline-block;
  margin-left:48px;
}
.remark{
  border: 1px solid rgb(90, 224, 72);
  padding: 4px;
  font-size: 12px;
  margin-left: 24px;
}
.msg{
  margin-left: 80px;
}
.date{
  margin-top: 4px;
  color: rgba(199, 199, 204,);
}
.right_title{
  font-size: 18px;
  overflow: hidden;
}
.datetext{
  margin-top: 4px;
  color: rgba(199, 199, 204,);
  font-size: 16px; 
}
.nopayment{
  color: red;
  font-size: 18px;
}
.content_box{
  background: white;
  padding: 24px;
  margin-top: 24px;
  max-height: 600px;
  overflow: auto;
}
table{
  width: 100%;
  text-align: center;
  line-height: 50px;
}
th{
  height: 50px;
  color: rgb(209, 209, 209);
}
td{
  height: 50px;
}
.content_foot{
   background: white;
  padding:0 24px;
  overflow: hidden;
  margin-top: 12px;
  .count{
    height: 64px;
    line-height: 64px;
    font-size: 18px;
  }
}
.left24{
  margin-left: 24px;
}
.btn_box{
  height: 64px;
  position: absolute;
  bottom: 24px;
}
</style>