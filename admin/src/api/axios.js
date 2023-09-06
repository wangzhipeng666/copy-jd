import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import { getTokenAUTH } from '@/utils/auth';

// let loadingInstance = null  // 加载全局的loading
const LoadingInstance = {
    _target: null, // 保存Loading实例
    _count: 0
};

function $httpClient (axiosConfig, customOptions, loadingOptions) {
    const instance = axios.create({
        baseURL: 'http://localhost:8000', // 设置统一的请求前缀
        timeout: 10000, // 设置统一的超时时长
    })
    
    // // 统一设置post请求头，axios默认为application/json请求方式
    // instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

    // 自定义配置
    let custom_options = Object.assign({
        repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
        loading: false, // 是否开启loading层效果, 默认为false
    }, customOptions);

    /** 添加请求拦截器 **/
    instance.interceptors.request.use(config => {
        // loadingInstance = ElLoading.service({// 发起请求时加载全局loading，请求失败或有响应时会关闭
        //     text: '拼命加载中...'
        // })

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

        // 自动携带token
        // typeof window !== "undefined" 主要是为了兼容ssr的环境情况
        if (getTokenAUTH() && typeof window !== "undefined") {
            config.headers.Authorization = getTokenAUTH();
        }
        removePending(config);
        custom_options.repeat_request_cancel && addPending(config);

        // 创建loading实例  
        if (custom_options.loading) {
            LoadingInstance._count++;
            if(LoadingInstance._count === 1) {
                LoadingInstance._target = ElLoading.service(loadingOptions)
            }
        }

        return config
    }, error => {
        return Promise.reject(error)
    })

    /** 添加响应拦截器 **/
    instance.interceptors.response.use(response => {
        // loadingInstance.close()
        removePending(response.config);
        custom_options.loading && closeLoading(custom_options); // 关闭loading
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
        // loadingInstance.close()
        error.config && removePending(error.config)
        custom_options.loading && closeLoading(custom_options); // 关闭loading
        httpErrorStatusHandle(error)
        return Promise.reject(error)
    })

    return instance(axiosConfig);
}

/* 统一封装get请求 */
export const get = (url, params, config = {}, customOptions) => {
    return new Promise((resolve, reject) => {
        $httpClient({
            method: 'get',
            url,
            params,
            ...config,
        }, customOptions).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* 统一封装post请求 */
export const post = (url, data, config = {}, customOptions) => {
    return new Promise((resolve, reject) => {
        $httpClient({
            method: 'post', 
            url,
            data,
            ...config
        }, customOptions).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/**
 * 关闭Loading层实例
 * @param {*} _options 
 */
function closeLoading(_options) {
    if(_options.loading && LoadingInstance._count > 0) LoadingInstance._count--;
    if(LoadingInstance._count === 0) {
      LoadingInstance._target.close();
      LoadingInstance._target = null;
    }
}

/* 重复请求处理 */
const pendingMap = new Map();

/**
 * 生成每个请求唯一的键
 * @param {*} config 
 * @returns string
 */
function getPendingKey(config) {
  let {url, method, params, data} = config;
  if(typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config 
 */
function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingMap.has(pendingKey)) {
      pendingMap.set(pendingKey, cancel);
    }
  });
}

/**
 * 删除重复的请求
 * @param {*} config 
 */
function removePending(config) {
    const pendingKey = getPendingKey(config);
    if (pendingMap.has(pendingKey)) {
       const cancelToken = pendingMap.get(pendingKey);
       cancelToken(pendingKey);
       pendingMap.delete(pendingKey);
    }
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