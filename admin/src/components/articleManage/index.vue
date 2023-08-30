<template>
    <div class="article">
        <el-card shadow="always" class="article-search">搜索</el-card>
        <el-card shadow="always">
            <articleList />
        </el-card>
    </div>
</template>

<script setup>
import { ElCard } from 'element-plus';
import articleList from './components/list.vue';

</script>

<style lang="less" scoped>
.article {
    width: 100%;
    &-search {
        margin-bottom: 20px;
    }
}
</style>
