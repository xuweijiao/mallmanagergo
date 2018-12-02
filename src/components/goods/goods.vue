<template>
<el-card>
  <!-- 面包屑 -->
  <my-bread level1="商品管理" level2="商品列表"></my-bread>
  <!-- 搜索框 -->
  <div style="margin-top: 15px;">
    <el-input clearable placeholder="请输入内容" v-model="query" class="input-with-select" style="width:300px">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 在标签里直接写路由  不用写this -->
    <el-button @click="$router.push({name:'addgoods'})" type="success" plain>添加商品</el-button>
  </div>
  <!-- 表格 -->
  <el-table :data="arrGoods" style="width: 100%" height="420px" border>
    <!-- type=index属于element表格自定义索引 -->
    <el-table-column header-align="left" align="left" type="index" label="#" ></el-table-column>
    <el-table-column header-align="left" align="left" prop="goods_name" label="商品名称" fit width="500px"></el-table-column>
    <el-table-column header-align="left" align="left" prop="goods_price" label="商品价格(元)" width="100px"></el-table-column>
    <el-table-column header-align="left" align="left" prop="goods_weight" label="商品重量" width="80px"></el-table-column>
    <!-- 如果单元格内显示的内容不是一个字符串,需要给被显示的内容外面包裹一个template -->
    <!-- 1.这样就成了子组件要用父组件中的数据,在子组件中设置属性slot-scope,该属性的值是要用数据的数据源----tableData -->
    <!-- 2.scope属性中有个row属性,代表数组中的每个对象tableData.row.create_time -->
    <el-table-column header-align="center" align="center" label="创建时间" width="100px">
      <template slot-scope="scope">{{scope.row.add_time | fmtdate}}</template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column header-align="center" prop align="center" label="操作" width="150px">
      <template slot-scope="scope">
        <el-row>
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      arrGoods: [],
      pagenum:1,
      pagesize:100
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表
    async getGoodsList() {
      // query	查询参数	可以为空
      // pagenum	当前页码	不能为空
      // pagesize	每页显示条数	不能为空
      const res = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res.data.data)
      this.arrGoods = res.data.data.goods

    }
  }
}
</script>

<style>
.el-table{
  margin-top: 10px;
}
</style>
