import { get, post } from './axios';

export const loginApi = (data) => post('/api/user/login', data);