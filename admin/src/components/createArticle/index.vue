<template>
    <el-card shadow="always" style="margin-bottom:20px;">
        <el-input v-model="title" placeholder="请输入文章标题" style="width:50%; "/>
        <div class="action">
            <el-button type="primary" @click="handleSaveArticle">保存 ⌘ + S</el-button>
        </div>
    </el-card>
  <v-md-editor v-model="content" height="100%"></v-md-editor>
</template>

<script setup>
import { ref } from 'vue';
import { ElCard, ElInput, ElButton, ElMessage } from 'element-plus';
import { saveBlogApi } from '@/api/blog.js';

const title = ref('test');
const content = ref('# 文本');

const handleSaveArticle = () => {
    if (!title) {
        ElMessage({
            message: '不要忘记填写文章标题哦',
            type: 'warning',
        })
    }
    let data = {
        title: title.value,
        content: content.value,
        author: 'wang',
    }
    saveBlogApi(data).then(res => {
        console.log(res.data);
    })
}
</script>

<style lang="less" scoped>
.action {
    float: right;
}
</style>
