<template>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item>首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {
  // 自定义组件的步骤:
  // 1,在实例化对象之前在Vue.componment('组件名',{})
  // 全局自定义组件

  name: "my-bread",
  /**data中的数据来源于自己,我们希望的值是自己使用组件时的位置
   * props的值是字符串数组
   * props值的用法和data中的用法一样
   * props数据的值得来源于使用组件时传的值
   */

  props: ['level1', 'level2']
}
</script>

<style>
</style>
