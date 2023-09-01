<template>
  <div class="article-toolbar">
    <el-button type="primary">新建文章</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%" stripe>
    <el-table-column prop="title" label="Title" />
    <el-table-column prop="createtime" label="Date" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElTable, ElTableColumn, ElButton } from 'element-plus';
import { getBlogListApi } from '@/api/blog.js';

const tableData = ref([]);

const getBlogList = () => {
  let params = {}
  getBlogListApi(params).then(res => {
    tableData.value = res.data
  }).catch(err => {
    console.log(err, 'err');
  })
}

onMounted(() => {
  getBlogList();
})
</script>

<style lang="less" scoped>
.article-toolbar {
  margin-bottom: 20px;
  float: right;
}
</style>
