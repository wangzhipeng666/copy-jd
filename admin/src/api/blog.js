import { get, post } from './axios';

export const getBlogListApi = (params) => get('/api/blog/list', params)