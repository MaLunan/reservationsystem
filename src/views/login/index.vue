<template>
  <div class="login">
        <el-card class="box-card">
            <div slot="header" class="head">
                <span>订餐系统</span> <router-link to='/register'>注册</router-link>
            </div>
            <div class="from_box">
            <el-form  label-position="right" :model="userFrom">
                <el-form-item>
                    <el-input v-model="userFrom.username" style="width:300px">
                        <i slot="prefix" class="el-input__icon el-icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item >
                    <el-input  style="width:300px" v-model="userFrom.password" show-password>
                        <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button class="btn" type="primary" @click="login">登录</el-button>
            </div>
        </el-card>
  </div>
</template>

<script>
import {setToken} from '@/utils/auth.js'
export default {
    data(){
        return{
            userFrom:{
                username:'admin',
                password:123456
            }
        }
    },
    methods: {
      login(){
          this.$axios({
                url:'/user/login',
                method:'post',
                data:this.userFrom
            }).then(res=>{
                setToken(res.token)
                this.$message({
                    message: '登录成功',
                    type: 'success'
                    });
                    setTimeout(()=>{
                         this.$router.push({path:'/order'})
                    },1000)
            }).catch(err=>{
                this.$message.error('登录失败')
            })
      }  
    }
    
}
</script>
<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    position: relative;
    background:url(../../assets/image/login.png);
    overflow: hidden;
}
.box-card{
width: 480px;
position:absolute;
right: 0;
height: 100%;
}
.from_box{
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%,-50%);
}
.head{
    text-align: left;
    font-size: 18px;
   
}
/deep/.el-card__header{
 border: none;
}
.btn{
    width: 100%;
    text-align: center;
}
a{
    color:#409EFF;
    float: right;
}
</style>