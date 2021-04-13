<template>
  <div class="login">
        <el-card class="box-card">
            <div slot="header" class="head">
                <span>登录</span>
            </div>
            <el-form class="from_box" label-position="right" label-width="80px" :model="userFrom">
                <el-form-item label="账号">
                    <el-input v-model="userFrom.username" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input  style="width:300px" v-model="userFrom.password"></el-input>
                </el-form-item>
            </el-form>
            <el-button class="btn" @click="login">登录</el-button>
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
}
.box-card{
width: 480px;
position:absolute;
top: 30%;
right: 10%;
height: 300px;
}
.from_box{
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%,-50%);
}
.head{
    text-align: center;
   
}
/deep/.el-card__header{
 border: none;
}
.btn{
    position: absolute;
    bottom: 24px;
    right: 50px;
}
</style>