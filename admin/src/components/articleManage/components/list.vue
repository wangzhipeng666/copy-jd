<template>
  <el-table :data="tableData" style="width: 100%" stripe>
    <el-table-column prop="title" label="Title" />
    <el-table-column prop="createtime" label="Date" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus';
import { getBlogListApi } from '@/api/blog.js';

const tableData = ref([]);

const getBlogList = () => {
  let params = {}
  getBlogListApi(params).then(res => {
    tableData.value = res.data
  })
}

onMounted(() => {
  getBlogList();
})
</script>

<style lang="less" scoped></style>
