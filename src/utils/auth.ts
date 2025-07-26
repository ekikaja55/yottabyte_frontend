// src/utils/auth.ts
import Cookies from 'js-cookie';

export const saveToken = (token: string) => {
  Cookies.set('token', token);
};

export const getToken = () => Cookies.get('token');

export const removeToken = () => Cookies.remove('token');
