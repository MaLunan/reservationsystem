<template>
    <div class="box">
        <div class="header">
           <el-button @click="isCollapse=!isCollapse">默认按钮</el-button>
        </div>
        <div class="middle">
            <div class="leftmenu">
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
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

<style lang="less">
.box{
    height: 100%;
}
.header{
    height: 60px;
    position: fixed;
    top:0px;
    background: red;
    width: 100%;
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
    padding-top: 60px;
    box-sizing: border-box;
}
.el-menu{
    height: 100%;
    width: 150px;
}
</style>