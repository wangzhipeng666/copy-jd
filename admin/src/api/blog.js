import { get, post } from './axios';
import Qs from 'qs';

// 获取博客列表
export const getBlogListApi = (params) => get('/api/blog/list', params, {},
    {
        loading: true
    },
    {
        text: '获取列表数据...'
    }
)
// 获取博客详情
export const getBlogDetailApi = (params) => get('/api/blog/detail', params, {},
    {
        loading: true
    },
    {
        text: '获取详情...'
    }
)
// 新建博客
export const saveBlogApi = (data) => post('/api/blog/new', data);
// export const getBlogListApi = (params) => get('/api/blog/list', params,
//     {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         transformRequest: [
//             (data) => {
//                 return Qs.stringify(data)
//             }
//         ],
        // transformRequest: [function (data) {
        //     // 对 data 进行任意转换处理
        //     let str = '';
        //     for (const key in data) {
        //          str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        //     }
        //     return str.slice(0, str.length - 1);
        // }],
//     },
//     {
//         repeat_request_cancel: false
//     }
// )