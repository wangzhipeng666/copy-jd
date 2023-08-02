<template>
    <div class="container">
        <div class="container-menu">
            <el-menu default-active="1" class="container-menu__top" :collapse="isCollapse">
                <el-menu-item index="1">
                    <el-icon><Edit /></el-icon>
                    <template #title>文章管理</template>
                </el-menu-item>
            </el-menu>

            <el-menu class="container-menu__center" :collapse="isCollapse">
                <el-menu-item>
                    <el-icon><User /></el-icon>
                    <template #title>退出</template>
                </el-menu-item>
                <el-menu-item>
                    <el-icon><More /></el-icon>
                    <template #title>更多</template>
                </el-menu-item>

                <el-divider />

                <el-menu-item>
                    <div class="container-menu__icon" @click="isCollapse = !isCollapse">
                        <el-icon v-if="!isCollapse"><Fold /></el-icon>
                        <el-icon v-if="isCollapse"><Expand /></el-icon>
                    </div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="container-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMenu, ElMenuItem, ElIcon, ElDivider } from 'element-plus';
import { Edit, Fold, Expand, User, More } from '@element-plus/icons-vue';

const isCollapse = ref(false);
</script>

<style scoped lang="less">
.container {
    display: flex;
    &-menu {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background-color: #ffffff;
        max-width: 208px;
        &__top {
            overflow: auto;
            flex: 1;
        }
        &-center {
            height: 240px;
        }
        &__icon {
            cursor: pointer;
        }
    }
    &-content {
        padding: 32px;
    }
}
</style>
