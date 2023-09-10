<template>
  <div class="login">
    <el-form :model="form" label-width="120px">
        <el-form-item label="用户名：">
            <el-input v-model="form.username" placeholder="输入用户名" />
        </el-form-item>
        <el-form-item label="密码：">
            <el-input v-model="form.password" placeholder="输入密码" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">确 定</el-button>
            <el-button>取 消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElInput, ElForm, ElFormItem, ElButton, ElMessage  } from 'element-plus';
import { loginApi } from '@/api/user.js';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const form = reactive({
    username: 'wang',
    password: '456',
})

const login = () => {
    loginApi(form).then(res => {
        if (res.errno === 0) {
            ElMessage({
                message: '登录成功',
                type: 'success',
            })
            router.push('/')
        }
    })
}
</script>

<style lang="less" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: antiquewhite;
}
</style>
