<template>
  <div class="moneyLocker">
      <div class="money_title clearfix">
          <div class="left">
            <h1 class="money_left_text">2020-10-25</h1>
          </div>
          <div class="right">
            <el-date-picker
              v-model="dateValue"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
             <el-button type="success">查询</el-button>
          </div>
      </div>
      <div class="money_statistics">
        <h1 class="statistics_title">营业分析</h1>
        <div class="statistics_content"> 
            <div class="clearfix content_box">
              <div class="imgbox left yellowcolor">
                <i class="iconfont icon-chongzhi1 iconimg"></i>
              </div>
              <div class="left right_box">
                <h1 class="title_text">
                    营业额(元)
                </h1>
                <p class="money_num">134568</p>
                <div class="span_box"><span class="money_span">成交：24</span><span>退款：16</span></div>
              </div>
            </div>
            <div class="clearfix content_box">
              <div class="imgbox left greencolor">
                <i class="iconfont icon-dingdan iconimg"></i>
              </div>
              <div class="left right_box">
                <h1 class="title_text">
                    订单(单)
                </h1>
                <p class="money_num">134568</p>
                <div class="span_box"><span class="money_span">成交：24</span><span>退款：16</span></div>
              </div>
            </div>
            <div class="clearfix content_box">
              <div class="imgbox left yellowcolor">
                <i class="iconfont icon-zhuozi iconimg"></i>
              </div>
              <div class="left right_box">
                <h1 class="title_text">
                    订桌(单)
                </h1>
                <p class="money_num">134568</p>
                <div class="span_box"><span class="money_span">成交：24</span><span>退款：16</span></div>
              </div>
            </div>
            <div class="clearfix content_box">
              <div class="imgbox left greencolor">
                <i class="iconfont icon-wode iconimg"></i>
              </div>
              <div class="left right_box">
                <h1 class="title_text">
                    就餐人数(人)
                </h1>
                <p class="money_num">134568</p>
                <div class="span_box"><span class="money_span">成交：24</span><span>退款：16</span></div>
              </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dateValue:''
    }
  },
  methods: {
    getdata(){
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
    }
  }
}
</script>

<style lang="less" scoped>
.moneyLocker{
    height: 100%;
    width: 100%;
    background: rgba(234, 234, 238, 0.699);
    overflow: auto;
}
.money_title{
  box-shadow: 0px 0px 2px 1px rgba(199, 199, 204, 0.699);
  margin: 24px;
  padding: 12px;
  height: 64px;
  line-height: 64px;
  background: white;

}
.money_left_text{
  font-weight: 500;
}
.money_statistics{
  padding: 12px;
  margin: 24px;
  background: white;
  box-shadow: 0px 0px 2px 1px rgba(199, 199, 204, 0.699);
}
.statistics_title{
  font-weight: 400;
  font-size: 16px;
}
.statistics_content{
  display: flex;
  height: 300px;
  justify-content: space-around;
  align-items: center;
}
.imgbox{
  height: 120px;
  border-radius:50%;
  width: 120px;
  
  color: white;
  text-align: center;
  line-height: 120px;
}
.yellowcolor{
background: rgb(241, 221, 35);
}
.greencolor{
  background: rgb(90, 224, 72);
}
.iconimg{
  font-size:68px;
}
.content_box{
  min-width: 300px;
}
.right_box{
  width: 156px;
  margin-left: 24px;
}
.title_text{
  font-size: 24px;
  font-weight: 400;
}
.money_num{
  font-size: 34px;
  color: #409EFF;
  margin: 12px 0 ;
}
.span_box{
  color:rgba(199, 199, 204) ;
}
.money_span{
  margin-right: 24px;
}
</style>