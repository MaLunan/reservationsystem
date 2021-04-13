<template>
  <div class="order clearfix">
      <div class="left_box">
        <ul class="dining_ul">
          <li class="dining_li" v-for="(item,index) in deskdata" :key="index" @click="getorder(item.state,item.orderID,item.ID)">
              <div>
                <p class="ding_title">{{item.ID}}号桌</p>
                <p class="ding_text">{{item.person}}人桌</p>
              </div>
              <div :class="['dining_footer',item.state!=='0'?'dining_greencolor':'dining_bluecolor']">
                {{item.state!=='0'?'在用':'空'}}
              </div>
          </li>
        </ul>
      </div>
      <div class="right_box">
            <div class="content_title">订单详情</div>
            <div v-if="Object.keys(this.shopdata).length===0">无订单信息</div>
            <div class="content_box"  v-else>
              <div class="tablebox">
                <table>
                  <tr>
                    <th>商品名</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>备注</th>
                  </tr>
                  <tr style="line-height:1.5em;" v-for="(item,key) in shopdata.goods" :key="key">
                    <td>{{key}}</td>
                    <td>{{item.value}}</td>
                    <td>{{item.num}}</td>
                    <td style="width:200px">{{item.remark}}</td>
                  </tr>
                </table>
              </div>
                <!-- <div class="shopnav">
                  <div  class="shop_li"> 
                      <span class="shop_span shop_title">商品名</span>
                      <span class="shop_span shop_title">单价</span>
                      <span class="shop_span shop_title">数量</span>
                      <span class="shop_span shop_title">备注</span>
                  </div>
                  <ul  class="shop_ul">
                      <li class="shop_li" v-for="(item,label) in shopdata.goods" :key="label">
                          <span class="shop_span">{{label}}</span>
                          <span class="shop_span"> {{item.value}}</span>
                          <span class="shop_span"> {{item.num}}</span>
                          <span class="shop_span"> {{item.remark}}</span>
                      </li>
                  </ul>
              </div> -->
              <div class="content_footer"> 
                <span class="left">结算金额：￥{{shopdata.amount}}</span><span class="right">就餐人数：{{shopdata.people}}</span>
              </div>
              <div class="content_btn">
                <el-button @click="payment"  :disabled="shopdata.state!=='0'">{{shopdata.state!=='0'?'已结账':'去结账'}}</el-button>
                <el-button v-if="shopdata.state!=='0'" @click="setdesk">离桌</el-button>
              </div>
              <el-dialog
                title="付款"
                :visible.sync="fukuanDialog"
                width="30%">
                <img style="width:100%" src="@/assets/image/fukuan.png" alt="">
              </el-dialog>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
          shopdata:{},
          deskdata:[],
          ID:'',
          fukuanDialog:false
        }
    },
    created () {
      this.getDesk()
    },
    methods: {
      //付款
      payment(){
        setTimeout(() => {
            this.$axios({
                url:'/Reservation/setorder',
                method:'post',
                data:{
                    ordernumber:this.shopdata.ordernumber,
                }
                }).then(res=>{
                    this.$message({
                        message: '付款成功',
                        type: 'success'
                        });
                    this.getDesk()
                }).catch(err=>{
                this.$message.error('付款失败')
                })
            this.fukuanDialog=false
        }, 3000);
      },
      //获取餐桌数据
      getDesk(){
        this.$axios({
            url:'/Reservation/getdesk',
            method:'post',
            }).then(res=>{
                this.deskdata=res
            }).catch(err=>{
                console.log(err)
            })
      },
      //获取订单信息
      getorder(state,ordernumber,ID){
        this.ID=ID
        this.shopdata={}
       if(!ordernumber||state==='0') return 
        this.$axios({
            url:'/Reservation/getorder',
            method:'post',
            data:{
              ordernumber
            }
            }).then(res=>{
              console.log(res)
                this.shopdata=res
            }).catch(err=>{
                this.$message.error('获取订单失败')
            })
      },
      //离座
      setdesk(){
        if(!this.ID) return this.$message.error('失败')
        this.$axios({
            url:'/Reservation/setdesk',
            method:'post',
            data:{
              ID:this.ID
            }
            }).then(res=>{
              this.shopdata={}
              this.getDesk()
            }).catch(err=>{
                this.$message.error('失败')
            })
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
        flex: 1;
        height: 100%;
        border-right: 1px solid rgba(199, 199, 204, 0.699);
        padding: 24px;
        box-sizing: border-box;
    }
    .right_box{
       width: 730px;
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
.content_footer{
  overflow: hidden;
  padding: 24px;
}
.content_btn{
  text-align: right;
  padding:0 24px;
}
.content_box{
  padding:0 12px;
}
.tablebox{
  max-height: 700px;
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
</style>