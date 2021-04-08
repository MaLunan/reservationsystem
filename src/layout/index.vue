<template>
    <div class="box">
        <div class="header">
           <el-button @click="isCollapse=!isCollapse" class="el-icon-s-fold" type='mini'></el-button>
        </div>
        <div class="middle">
            <div class="leftmenu">
                <el-menu
                default-active="/order"
                :router='true'
                class="el-menu-vertical-demo"
                :collapse-transition='false'
                :collapse="isCollapse"
                background-color="rgb(41,131,187)"
                text-color="white"
                active-text-color="#ffd04b">
                <el-menu-item index="/order">
                    <i class="iconfont icon-tubiao-"></i>
                    <span slot="title">点餐</span>
                </el-menu-item>
                <el-menu-item index="/diningTable">
                    <i class="iconfont icon-zhuozi"></i>
                    <span slot="title">订桌</span>
                </el-menu-item>
                <el-menu-item index="/moneyLocker">
                    <i class="iconfont icon-guizi"></i>
                    <span slot="title">钱柜</span>
                </el-menu-item>
                <el-menu-item index="/orderdetail">
                    <i class="iconfont icon-chongzhi1"></i>
                    <span slot="title">订单详情</span>
                </el-menu-item>
                </el-menu>
            </div>
            <div class="content">
                <router-view/>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            isCollapse: false
        }
    }
}
</script>
<style lang="less" scoped>
.box{
    height: 100%;
}
.header{
    height: 60px;
    position: fixed;
    top:0px;
    width: 100%;
    line-height: 60px;
    text-align: left;
    padding:0 24px;
    border-bottom: 1px solid rgba(199, 199, 204, 0.699);
}
.leftmenu{
    float:left;
    height: 100%;
}
.content{
    overflow: hidden;
    height: 100%;
}
.middle{
    height: 100%;
    padding-top: 61px;
    box-sizing: border-box;
}
.el-menu{
    height: 100%;
    // width: 150px;
}
.iconfont{
    font-size: 18px;
    color: white;
}
</style>