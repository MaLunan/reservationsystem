<template>
    <div class="box">
        <div class="header">
           <!-- <el-button @click="isCollapse=!isCollapse" class="el-icon-s-fold" type='mini'></el-button> -->
           <router-link  to="/" class="el-icon-s-home home"></router-link>
           <div class="head_rg_box">
               <div class="circle">
                   <img src="@/assets/image/touxiang.png" alt="">
               </div>
               <el-dropdown @command='login'>
                    <span class="el-dropdown-link">
                        管理员<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
           </div>
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
                <el-menu-item index="/Commodity">
                    <i class="iconfont icon-swticondingcan"></i>
                    <span slot="title">餐品管理</span>
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
import {removeToken} from '@/utils/auth.js'
export default {
    data(){
        return {
            isCollapse: false
        }
    },
    methods:{
        login(){
            removeToken('Admin-Token')
            this.$router.push('/login')
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
.home{
    font-size: 24px;
    line-height: 62px;
    color: #409EFF;
}
.circle{
    height: 36px;
    width: 36px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;
}
img{
    width: 100%;
    height: 100%;
}
.head_rg_box{
    width: 200px;
    position: absolute;
    right: 20px;
    top: 0;
    display: flex;
    align-items: center;
}
</style>