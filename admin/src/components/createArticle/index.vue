<template>
    <el-card shadow="always" style="margin-bottom:20px;">
        <el-input v-model="title" placeholder="请输入文章标题" style="width:50%; "/>
        <div class="action">
            <el-button type="primary" @click="handleSaveArticle">保存 ⌘ + S</el-button>
            <el-button @click="router.push('/')">返回</el-button>
        </div>
    </el-card>
  <v-md-editor v-model="content" height="100%"></v-md-editor>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElCard, ElInput, ElButton, ElMessage } from 'element-plus';
import { saveBlogApi, getBlogDetailApi, uploadBlogApi } from '@/api/blog.js';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const title = ref('');
const content = ref('# 文本');

const articleId = route.query.id

const getBlogDetail = () => {
    getBlogDetailApi({
        id: articleId
    }).then(res => {
        if (res.errno === 0) {
            title.value = res.data.title
            content.value = res.data.content
        }
    })
}

onMounted(() => {
    if (articleId) {
        getBlogDetail()
    }
})

const handleSaveArticle = () => {
    if (!title.value) {
        return ElMessage({
            message: '不要忘记填写文章标题哦',
            type: 'warning',
        })
    }
    let data = {
        title: title.value,
        content: content.value,
        author: 'wang',
    }
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://localhost:8000/api/blog/new', true);
    // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    // xhr.send(`title=${title.value}&content=${content.value}&author=wang`);

    const apiCall = articleId ? uploadBlogApi(articleId, data) : saveBlogApi(data)
    apiCall.then(res => {
        if (res.errno === 0) {
            const message = articleId ? '更新成功' : '保存成功'
            ElMessage({
                message,
                type: 'success',
            })
            router.push('/');
        }
    })
}

</script>

<style lang="less" scoped>
.action {
    float: right;
}
</style>
