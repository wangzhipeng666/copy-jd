<template>
  <v-md-editor v-model="text" height="100%"></v-md-editor>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('# 文本')
</script>

<style lang="less" scoped></style>
