<template>
  <div class="order clearfix">
      <div class="left_box">
            <div class="setorder-title">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{way}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="堂食">堂食</el-dropdown-item>
                        <el-dropdown-item command="自取">自取</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown trigger="click" @command="handleCommand2">
                    <span class="el-dropdown-link">
                        {{num+'人'}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="1">1人</el-dropdown-item>
                        <el-dropdown-item :command="2">2人</el-dropdown-item>
                        <el-dropdown-item :command="3">3人</el-dropdown-item>
                        <el-dropdown-item :command="4">4人</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="iconfont icon-cangpeitubiao_shanchu" @click="delshop"></div>
            </div>
            <div class="shop_box">
                <div class="isnull" v-if="JSON.stringify(shopdata)==='{}'">
                    <img src="@/assets/image/isnull.png" alt="">
                </div>
                <div v-else class="shopnav">
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
                            <!-- <span class="shop_span"> {{(item.value*item.num).toFixed(1)}}</span> -->
                            <span class="el-icon-minus shop_icon" @click="setnum(label,item.tabActive,item.ind)"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="shop_button" @click="payment">
                付款 ￥ {{moneynum}}
            </div>
                <el-dialog
                title="付款"
                :visible.sync="fukuanDialog"
                width="30%">
                <img style="width:100%" src="@/assets/image/fukuan.png" alt="">
            </el-dialog>

      </div> 
      <div class="centreone_box">
            <div class="tab_block" @click="opendesk">选择餐桌</div>
            <div class="tab_block" @click="openRemark">备注</div>
            <div class="tab_block" @click="hangUp">挂起</div>
            <el-dialog
            title="选择餐桌"
            :visible.sync="deskShow"
            width="30%"
            >
             <el-select v-model="desks" placeholder="请选择">
                <el-option
                v-for="item,index in deskSelect"
                :key="index"
                :label="item.ID+'号桌'+(item.state==='1'?'(在用)':'')"
                :value="item.ID"
                :disabled="item.state==='1'">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="setdesk">确 定</el-button>
            </span>
            </el-dialog>
            <el-dialog
            title="设置备注"
            :visible.sync="remarkShow"
            width="30%"
            >
             <el-select v-model="remarkSelect" placeholder="请选择">
                <el-option
                v-for="item,key in shopdata"
                :key="key"
                :label="key"
                :value="key">
                </el-option>
            </el-select>
            <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="remark">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="setRemark">确 定</el-button>
            </span>
            </el-dialog>
      </div>
      <div class="centretwo_box">
            <ul class="commodity_ul clearfix">
                <li class="commodity_li" @click="pushshop(index)" v-for="(item,index) in foodList[tabActive]" :key="index">
                    <h2 class="commodity_title">{{item.label}}</h2>
                    <div class="commodity_money">￥{{item.value}}</div>
                    <div class="commodity_num" v-if="item.num>0">
                       {{item.num}}
                    </div>
                </li>
            </ul>
      </div>
      <div class="right_box">
              <ul class="tab_ul">
                  <li @click="selectTab(index,item)" v-for="(item,index) in classify" :key="index" :class="['tab_li',tabActive===index?'tab_active':'']">{{item}}</li>
              </ul>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            way:"堂食",
            num:1,
            ify:'饮料',
            classify:['饮料','小吃','披萨'],
            desk:'',
            fukuanDialog:false,
            remarkShow:false,
            remark:'',
            remarkSelect:'',
            deskShow:false,
            desks:'',
            deskSelect:[],
            foodList:[
                [],
                [],
                []
            ],
            tabActive:0,
            shopdata:{}
        }
    },
    computed:{
        //付款金额
        moneynum(){
            let num=0
         for(let item in this.shopdata){
             num=(this.shopdata[item].num*this.shopdata[item].value)-0+num
            }  
            return num.toFixed(1)
        }
    },
    mounted(){
        this.getCommodity()
    },
    methods: {
        //获取商品信息
        getCommodity(){
            this.$axios({
                    url:'/Reservation/getcommodity',
                    method:'post',
            }).then(res=>{
                this.foodList=res
            }).catch(err=>{
               console.log(err)
            })
        }, 
        //付款
        payment(){
            if(Object.keys(this.shopdata).length===0) return this.$message({
          message: '当前暂无商品',
          type: 'warning'
        });
        if(!this.desk&&this.way==='堂食') return this.$message({
          message: '请选择餐桌',
          type: 'warning'
        });
        if(this.desk&&this.way!=='堂食') return this.$message({
          message: '请选择餐桌',
          type: 'warning'
        });
         this.fukuanDialog=true
            setTimeout(() => {
                let data={
                people:this.num,
                way:this.way,
                goods:this.shopdata,
                desk:this.desk,
                amount:this.moneynum
                }
                this.$axios({
                    url:'/Reservation/addorder',
                    method:'post',
                    data
                }).then(res=>{
                    console.log(res)
                    this.$axios({
                    url:'/Reservation/setorder',
                    method:'post',
                    data:{
                        ordernumber:res.ordernumber,
                    }
                    }).then(res=>{
                        this.$message({
                            message: '付款成功',
                            type: 'success'
                            });
                        this.shopdata={}
                        this.foodList.map(item=>{
                        return item= item.map(itm=>{
                                return itm.num=0
                            })
                        })
                    }).catch(err=>{
                    this.$message.error('付款失败,可在订单页面重新付款')
                    })
                }).catch(err=>{
                   this.$message.error('付款失败')
                })
                this.fukuanDialog=false
            }, 3000);
            
        },
        
        //挂起
        hangUp(){
        if(Object.keys(this.shopdata).length===0) return this.$message({
          message: '当前暂无商品',
          type: 'warning'
        });
        if(!this.desk&&this.way==='堂食') return this.$message({
          message: '请选择餐桌',
          type: 'warning'
        });
                let data={
                people:this.num,
                way:this.way,
                goods:this.shopdata,
                desk:this.desk,
                amount:this.moneynum
                }
                this.$axios({
                    url:'/Reservation/addorder',
                    method:'post',
                    data
                }).then(res=>{
                    this.$message({
                        message: '订单已生成,可在订单模块查看',
                        type: 'success'
                        });
                    this.shopdata={}
                    this.foodList.map(item=>{
                    return item= item.map(itm=>{
                            return itm.num=0
                        })
                    })
                }).catch(err=>{
                   this.$message.error('订单生成失败')
                })
        },
        handleCommand(command){
            console.log(command)
            this.way=command
        },
        handleCommand2(command){
            this.num=command
        },
        //选择小吃分类
        selectTab(ind,classify){
            this.tabActive=ind
            this.ify=classify
        },
        //备注弹窗
        openRemark(){
            this.remarkSelect=''
            this.remark=''
            this.remarkShow=true
        },
        //设置备注
        setRemark(){
            this.shopdata[this.remarkSelect].remark=this.remark
            this.remarkShow=false
        },
        //餐桌弹窗
        opendesk(){
            this.desk=''
            this.desks=''
             this.deskSelect=[]
            this.$axios({
                    url:'/Reservation/getdesk',
                    method:'post'
                }).then(res=>{
                    this.deskSelect=res
                }).catch(err=>{
                   console.log(err)
                })
            this.deskShow=true
        },
        //选择餐桌
        setdesk(){
            this.desk=this.desks
            this.deskShow=false
        },
        //添加商品
        pushshop(ind){
            console.log(this.shopdata)
            this.$set(this.foodList[this.tabActive][ind],'num',this.foodList[this.tabActive][ind].num+1-0)
            this.$set(this.shopdata,this.foodList[this.tabActive][ind].label,{
                value:Number(this.foodList[this.tabActive][ind].value),
                num:this.foodList[this.tabActive][ind].num,
                tabActive:this.tabActive,
                ind:ind
            })
        },
        //删除订单
        delshop(){
            this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.shopdata={}
            this.foodList.map(item=>{
              return item= item.map(itm=>{
                    return itm.num=0
                })
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        //删除商品
        setnum(label,tabActive,ind){
            console.log(label,tabActive,ind)
            console.log(this.shopdata[label].num)
            --this.shopdata[label].num
            --this.foodList[tabActive][ind].num
            if(this.shopdata[label].num<=0){
                // delete this.shopdata[label]
                this.$delete(this.shopdata,label)
            }

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
        width: 320px;
        height: 100%;
        border-right: 1px solid rgba(199, 199, 204, 0.699);
        padding: 24px;
        box-sizing: border-box;
        .setorder-title{
            text-align: center;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .centreone_box{
        width: 108px;
        padding:20px 14px 0;
        height: 100%;
        box-sizing: border-box;
    }
    .centretwo_box{
        flex:1;
        height: 100%;
        border-right:1px solid rgba(199, 199, 204, 0.699);
        border-left: 1px solid rgba(199, 199, 204, 0.699);
    }
    .right_box{
         width: 108px;
        height: 100%;
        box-sizing: border-box;
    }
}
.el-dropdown{
    color: #409EFF;
    cursor: pointer;
    width: 80px;
}
.iconfont{
    color: #409EFF;
    cursor: pointer;
}
.shop_box{
    width: 100%;
    .isnull{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        margin-top: 100px;
        img{
            height: 100%;
            width: 100%;
        }
    }
}
.commodity_ul{
    .commodity_li{
        float: left;
        height: 70px;
        width: 150px;
        border: 1px solid rgba(199, 199, 204, 0.699);
        margin: 14px;
        border-top: 5px solid #409EFF;
        border-radius: 12px 12px 0 0 ;
        padding: 14px;
        cursor: pointer;
        position: relative;
        .commodity_title{
            font-weight: 400;
        }
        .commodity_money{
            margin-top: 20px;
            font-size: 16px;
        }
    }
    .commodity_num{
        position:absolute;
        width: 30px;
        height: 30px;
        right: -10px;
        top: -10px;
        background: red;
        color: white;
        border-radius: 50%;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        line-height: 30px;
    }
}
.tab_ul{
    
    .tab_li{
        width: 60px;
        height: 30px;
        border:1px solid rgba(199, 199, 204, 0.699);
        margin: 24px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }
    .tab_active{
        color: white;
        background: rgb(108, 185, 230);
    }
}
.shopnav{
    padding: 24px 0;
}
.shop_ul{
    height: 670px;
    overflow: auto;
}
.shop_li{
        font-size: 16px;
        .shop_span{
            display: inline-block;
            width: 80px;
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
.shop_button{
    position: absolute;
    bottom: 24px;
    width: 272px;
    margin: 0 auto;
    background: chocolate;
    cursor: pointer;
    text-align: center;
    height: 64px;
    line-height: 64px;
    color: white;
    border-radius: 12px;
    font-size: 18px;
}
.tab_block{
margin:0 14px;
border:1px solid rgba(199, 199, 204, 0.699);
padding: 6px;
margin: 2px auto;
text-align: center;
cursor: pointer;
}
.tab_block:hover{
    background: #409EFF;
}
</style>