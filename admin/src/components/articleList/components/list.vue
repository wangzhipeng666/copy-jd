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
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="handleEditArticle(scope.row.id)" style="margin-right:10px;">修改</el-button>
        <el-popconfirm
          title="确定要删除这条博客吗?"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="handleDelArticle(scope.row.id)"
        >
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElTable, ElTableColumn, ElButton, ElMessage, ElPopconfirm } from 'element-plus';
import { getBlogListApi, delBlogApi } from '@/api/blog.js';
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

const handleEditArticle = (id) => {
  router.push({
    path: '/createArticle',
    query: { id }
  });
}

const handleDelArticle = (id) => {
  delBlogApi(id).then(res => {
    if (res.errno === 0) {
      ElMessage({
          message: '删除成功',
          type: 'success',
      })
      getBlogList();
    }
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
