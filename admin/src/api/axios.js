import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000', // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
})

// // 统一设置post请求头，axios默认为application/json请求方式
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
    // 全局设置token
    // 后期配合服务端同时处理
    // config.headers['token'] = sessionStorage.getItem('token') || ''

    // 添加时间戳参数，防止浏览器（IE）对get请求的缓存
    if (config.method === 'get') {
        config.params = {
            ...config.params,
            t: new Date().getTime()
        }
    }

    // // 如果是导出文件的接口：因为返回的是二进制流，所以需要设置请求响应类型为blob。
    // if (config.url.includes('pur/contract/export')) {
    //     config.headers['responseType'] = 'blob'
    // }
    // // 如果是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'。
    // if (config.url.includes('pur/contract/upload')) {
    //     config.headers['Content-Type'] = 'multipart/form-data'
    // }
    return config
}, error => {
    return Promise.reject(error)
})

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
    if (response.data.errno == '0') {
        return Promise.resolve(response.data)
    }


}, error => {

})

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'get',
            url,
            params,
            ...config,
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'post', 
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}