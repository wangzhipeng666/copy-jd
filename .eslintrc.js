module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential', // Vue 3.x项目的基本规则
        '@vue/prettier', // 使用prettier插件来实现与prettier格式一致的代码
        'eslint:recommended' // ESLint内置推荐规则
    ],
    parserOptions: {
        parser: 'babel-eslint' // 使用babel-eslint作为解析器
    },
    rules: {
        // 在这里添加项目需要的自定义规则
        'no-console': 0, // 禁用 no-console 规则
        'no-unused-vars': 1, // 未使用的变量会产生警告
        'no-undef': 2 // 未定义的变量会产生错误
    }
};
