import { get, post } from './axios';
import Qs from 'qs';

export const getBlogListApi = (params) => get('/api/blog/list', params, {},
    {
        loading: true
    },
    {
        text: '获取列表数据...'
    }
)

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
//     },
//     {
//         repeat_request_cancel: false
//     }
// )