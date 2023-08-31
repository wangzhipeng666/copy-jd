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

### 添加路由 vue-router

1. 安装 npm install vue-router@4 --save
2. 创建路由配置文件
3. 在主应用文件（例如 main.js）中挂载路由
4. 在 App.vue 中使用 <router-view> 来渲染路由组件

### 添加 css 扩展语言 less

1. npm install less --save-dev
2. 使用 <style lang="less"></style>

### 封装axios - 网络请求
1. npm install axios --save
2. 创建api文件夹 详情见axios.js文件
3. 配置请求头有可能会导致跨域错误 - 例如：config.headers['token'] = sessionStorage.getItem('token') || ''

### vite配置别名
```
resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // 将@别名映射到src目录
      'api': path.resolve(__dirname, './src/api'),
    }
},
```