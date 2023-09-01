import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';

const instance = axios.create({
    baseURL: 'http://localhost:8000', // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
})

// // 统一设置post请求头，axios默认为application/json请求方式
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let loadingInstance = null  // 加载全局的loading

/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
    loadingInstance = ElLoading.service({// 发起请求时加载全局loading，请求失败或有响应时会关闭
        text: '拼命加载中...'
    })

    // 添加时间戳参数，防止浏览器（IE）对get请求的缓存
    if (config.method === 'get') {
        config.params = {
            ...config.params,
            t: new Date().getTime()
        }
    }

    // // 如果是导出文件的接口：因为返回的是二进制流，所以需要设置请求响应类型为blob。
    // if (config.url.includes('/api/blog/export')) {
    //     config.headers['responseType'] = 'blob'
    // }
    // // 如果是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'。
    // if (config.url.includes('/api/blog/upload')) {
    //     config.headers['Content-Type'] = 'multipart/form-data'
    // }
    return config
}, error => {
    return Promise.reject(error)
})

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
    loadingInstance.close()
    if (response.data.errno == '0') {
        return Promise.resolve(response.data)
    } else {
        ElMessage({
            message: response.data.message,
            type: 'error'
        })
        return Promise.reject(response.data.message)
    }
}, error => {
    loadingInstance.close()
    httpErrorStatusHandle(error)
    return Promise.reject(error)
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

/**
 * 处理异常
 * @param {*} error 
 */
function httpErrorStatusHandle(error) {
    let message = '';
    if (error && error.response) {
        switch(error.response.status) {
            case 302: message = '接口重定向了！';break;
            case 400: message = '参数不正确！';break;
            case 401: message = '您未登录，或者登录已经超时，请先登录！';break;
            case 403: message = '您没有权限操作！'; break;
            case 404: message = `请求地址出错: ${error.response.config.url}`; break;
            case 408: message = '请求超时！'; break;
            case 409: message = '系统已存在相同数据！'; break;
            case 500: message = '服务器错误！'; break;
            case 501: message = '服务未实现！'; break;
            case 502: message = '网关错误！'; break;
            case 503: message = '服务不可用！'; break;
            case 504: message = '服务暂时无法访问，请稍后再试！'; break;
            case 505: message = 'HTTP版本不受支持！'; break;
            default: message = '异常问题，请联系管理员！';break;
        }
    }
    if (error.message.includes('timeout')) message = '网络请求超时！';
    if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';

    ElMessage({
        type: 'error',
        message
    })
}