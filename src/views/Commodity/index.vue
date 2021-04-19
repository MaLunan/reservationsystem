<template>
<div class="box">
     <el-button type="success" @click="handleClick(null)">添加商品</el-button>
     <el-table
    :data="foodList"
    border
    style="width: 100%;margin:40px auto;">
    <el-table-column
      prop="label"
      label="商品名称"
        >
    </el-table-column>
    <el-table-column
      prop="value"
      label="单价"
        >
    </el-table-column>
    <el-table-column
      prop="classify"
      label="分类"
        >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="delCommodity(scope.row._id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <pagination 
        :total='page.total' 
        :page='page.current' 
        :limit='page.size'
        @update:limit='updatelimit' 
        @update:page='updatepage'
        @pagination='pagination'>
    </pagination>
  <el-dialog
        title="添加/修改商品"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <el-form ref="formList" :model="formList" label-width="80px">
            <el-form-item label="商品名称">
                <el-input v-model="formList.label"></el-input>
            </el-form-item>
            <el-form-item label="单价">
                <el-input-number v-model="formList.value"  :min="0"  ></el-input-number>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="formList.classify" placeholder="分类">
                    <el-option v-for="(item,index) in classifyList" :label="item" :value="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="pushCommodity">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import pagination from '@/components/pagination.vue'
export default {
    components:{pagination},
    data(){
        return{
            foodList:[],
            formList:{
                label:'',
                value:0,
                classify:'',
                _id:null
            },
            classifyList:['饮料','小吃','披萨'],
            dialogVisible:false,
            page:{
                total:0,
                current:1,
                size:10,
            }
        }
    },
    mounted(){
        this.getCommodity()
    },
    methods:{
        //获取商品信息
        getCommodity(){
            this.$axios({
                    url:'/Reservation/getallcommodity',
                    method:'post',
                    data:this.page
            }).then(res=>{
                this.foodList=res.data
                this.page.total=res.total
                this.page.current=res.current
                this.page.size=res.size
            }).catch(err=>{
               console.log(err)
            })
        },
        //删除商品
        delCommodity(_id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                this.$axios({
                        url:'/Reservation/delcommodity',
                        method:'post',
                        data:{_id}
                }).then(res=>{
                    this.$message({
                    message: '删除成功',
                    type: 'success'
                    });
                    this.page.current=1
                    this.getCommodity()
                }).catch(err=>{
                console.log(err)
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });  
          });  
        },
        //添加商品
        pushCommodity(){
            this.$axios({
                    url:'/Reservation/setcommodity',
                    method:'post',
                    data:this.formList
            }).then(res=>{
                this.$message({
                message: '添加成功',
                type: 'success'
                });
                this.dialogVisible=false
                this.page.current=1
                this.getCommodity()
            }).catch(err=>{
               console.log(err)
            })
        },
        handleClick(row){
            if(row){
                this.formList= JSON.parse(JSON.stringify(row))
            }else{
                this.formList={
                    lalabel:'',
                    value:0,
                    classify:'',
                     _id:null
                }
            }
            this.dialogVisible=true
        },
        //分页
		pagination(val){
        this.page.current=val.page
        this.page.size=val.limit
		this.getCommodity()
		},
		//更新条数时调用
        updatelimit(val){
        },
        //更新页数时调用
        updatepage(val){
        },
    }
}
</script>

<style lang="less" scoped>
.box{
    padding: 24px;
}
</style>