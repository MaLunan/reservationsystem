<template>
  <div class="login">
        <el-card class="box-card">
            <div slot="header" class="head">
                <span>注册账号</span>
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
                <el-form-item >
                    <el-input  style="width:300px" v-model="userFrom.phone">
                        <i slot="prefix" class="el-input__icon el-icon-phone"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button class="btn" type="primary" @click="login">注册</el-button>
            </div>
        </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            userFrom:{
                username:'',
                password:'',
                phone:''
            }
        }
    },
    methods: {
      login(){
          this.$axios({
                url:'/user/register',
                method:'post',
                data:this.userFrom
            }).then(res=>{
                this.$message({
                    message: '成功注册，马上跳转登录界面',
                    type: 'success'
                    });
                    setTimeout(()=>{
                         this.$router.push({path:'/login'})
                    },1000)
            }).catch(err=>{
                this.$message.error('注册失败')
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
</style>