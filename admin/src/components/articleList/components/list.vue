<template>
  <div class="article-toolbar">
    <el-button type="primary" @click="handleToPage">新建文章</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%" stripe>
    <el-table-column prop="title" label="Title" />
    <el-table-column label="Date">
      <template #default="scope">
        {{ filterDateFormat(scope.row.createtime) }}
      </template>
    </el-table-column>
    <el-table-column prop="author" label="author" />
  </el-table>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElTable, ElTableColumn, ElButton } from 'element-plus';
import { getBlogListApi } from '@/api/blog.js';
import { useRouter, useRoute } from 'vue-router';
import { filterDateFormat } from '@/utils'

const router = useRouter();
const route = useRoute();

const tableData = ref([]);

const getBlogList = () => {
  let params = {}
  getBlogListApi(params).then(res => {
    if (res.errno === 0) {
      tableData.value = res.data
    }
  })
}

const handleToPage = () => {
  router.push('/createArticle');
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
