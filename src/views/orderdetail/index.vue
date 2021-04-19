<template>
  <div class="order">
      <div class="left_box">
          <div class="left_title">
            <div :class="['tab',active==='all'?'active':'']" @click="setTab('all')">
                全部
            </div>
            <div :class="['tab',active==='1'?'active':'']"  @click="setTab('1')">
                已记账
            </div>
            <div :class="['tab',active==='0'?'active':'']"  @click="setTab('0')">
                未结账
            </div>
          </div>
          <ul class="left_ul">
            <li class="left_li" v-for="(item,index) in dataList" :key="index" @click="setorder(item)">
              <div class="imgbox">
                <i class="el-icon-s-platform"></i>
              </div>
              <h1 class="content_titles">流水号5</h1>
              <span class="way">{{item.way}}</span>
              <div class="remark" v-if="item.state==='1'">已结账</div>
              <div class="msg">
                  <p class="money">
                    ￥{{item.amount}}
                  </p>
                  <p class="date">{{formatDate(item.creation)}}</p>
              </div>
            </li>
          </ul>
      </div>
      <div class="right_box" v-if="!orderList.ordernumber">
        <div class="right_title">暂无订单信息</div>
        <img src="@/assets/image/wudingdan.png" alt="">
      </div>
      <div class="right_box" v-else>
          <div class="right_title">
            <div class="left">
              订单号：{{orderList.ordernumber}}
            </div>
            <div class="right left24">
              {{orderList.people}}人
            </div>
            <div class="right">
             {{orderList.way}}
            </div>
            
          </div>
          <div class="right_title top24">
            <div class="left">
              订单信息
            </div>
            <div class="right">
              <!-- <span class="datetext">支付时间 ： 2020-10-11 10:25</span> -->
              <span class="nopayment">{{orderList.state==='1'?'已支付':'未支付'}}</span>
            </div>
          </div>
          <div class="content_box">
            <table>
              <tr>
                <th>商品名</th>
                <th>单价</th>
                <th>数量</th>
                <th>备注</th>
              </tr>
              <tr style="line-height:1.5em;" v-for="(item,key) in orderList.goods" :key="key">
                <td>{{key}}</td>
                <td>{{item.value}}</td>
                <td>{{item.num}}</td>
                <td style="width:200px">{{item.remark}}</td>
              </tr>
            </table>
          </div>
          <div class="content_foot clearfix">
            <div class="left count">
            </div>
            <div class="right count">
              总计：￥{{orderList.amount}}
            </div>
          </div>
          <div class="btn_box">
            <el-button class="btn" type="primary" v-if="orderList.state!=='1'" @click="payment">结账</el-button>
            <el-button class="btn" type="primary" v-else @click="refund">退款</el-button>
          </div>
          <el-dialog
                title="付款"
                :visible.sync="fukuanDialog"
                width="30%">
                <img style="width:100%" src="@/assets/image/fukuan.png" alt="">
          </el-dialog>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
          active:'all',
          dataList:[],
          orderList:{},
          fukuanDialog:false
        }
    },
    created () {
      this.getorder()
    },
    methods: {
      //退款
      refund(){
        this.$confirm('将款项退回原账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
                url:'/Reservation/unsetorder',
                method:'post',
                data:{
                    ordernumber:this.orderList.ordernumber,
                }
            }).then(res=>{
                this.$message({
                    message: '退款成功',
                    type: 'success'
                    });
                this.getorder()
            }).catch(err=>{
            this.$message.error('退款失败')
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退款'
          });          
        });
      },
       //付款
      payment(){
        this.fukuanDialog=true
        setTimeout(() => {
            this.$axios({
                url:'/Reservation/setorder',
                method:'post',
                data:{
                    ordernumber:this.orderList.ordernumber,
                }
                }).then(res=>{
                    this.$message({
                        message: '付款成功',
                        type: 'success'
                        });
                    this.getorder()
                }).catch(err=>{
                this.$message.error('付款失败')
                })
            this.fukuanDialog=false
        }, 3000);
      },
      //tab切换
      setTab(ind){
        this.active=ind
        this.getorder()
      },
      //获取订单信息
      getorder(){
        this.$axios({
              url:'/Reservation/getorderSelect',
              method:'post',
              data:{
                state: this.active
              }
          }).then(res=>{
            console.log(res)
            if(res.length){
               this.dataList=res
              this.orderList=res[0]
            }else{
              this.dataList=[]
              this.orderList={}
            }
            
          }).catch(err=>{
              console.log(err)
          })
      },
      //切换订单
      setorder(val){
        this.orderList=val
      },
      formatDate(timestamp) {
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = this.addZero(date.getMonth() + 1);
        var day = this.addZero(date.getDate());
        var hours = this.addZero(date.getHours());
        var minutes = this.addZero(date.getMinutes());
        var seconds = this.addZero(date.getSeconds());
        // return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        return year + '-' + month + '-' + day;
      },
      addZero(num) {
        return num < 10 ? '0' + num : num;
      }
    }
}
</script>

<style lang="less" scoped>
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
  flex: 1;
  text-align: right;
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
  max-height: 530px;
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
  display: flex;
  justify-content: center;
  width: 100%;
  .btn{
    width: 40%;
  }
}
</style>