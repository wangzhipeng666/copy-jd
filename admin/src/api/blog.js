import { get, post } from './axios';
import Qs from 'qs';

export const getBlogListApi = (params) => get('/api/blog/list', params,
    {
        repeat_request_cancel: false
    }
)
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