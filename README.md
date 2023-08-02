# personal-blog

## 项目创建

### 使用 vite 创建 vue3 项目

```
yarn create vite my-vue-app --template vue
```

### 按需引入 element-plus

> https://element-plus.org/zh-CN/guide/quickstart.html#%E7%94%A8%E6%B3%95 > https://github.com/element-plus/unplugin-element-plus#readme

### 代码规范

#### 3.1 格式规范

    - 在 VSCode 的扩展中，安装插件 Prettier - Code formatter
    - 然后需要在 项目根目录 之中创建 .prettierrc，配置规则

#### 3.2 eslint 规范

    - 安装eslint
    ```
    npm install eslint --save-dev
    npm install eslint-plugin-vue --save-dev

    - 然后需要在 项目根目录 之中创建 .eslintrc.js，配置规则
