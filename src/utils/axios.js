import axios from 'axios';
import {Message,Loading} from 'element-ui';
import { getToken } from '@/utils/auth'
import Router from '@/router'
var instance = axios.create({
  timeout: 30000,
  baseURL : "/api",
  // baseURL : process.env.NODE_ENV === 'production'? '/' :'/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //'X-Requested-With': 'XMLHttpRequest'  
  }
});

let loading ;
var openFullScreen = function() {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}
var closeFullScreen = function(){
  loading.close();
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers['token'] = getToken()
  if(!config.noLoading){
    openFullScreen();
  }

  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  closeFullScreen();
  // if(Object.prototype.toString.call(response.data) === '[object Array]'){
  //   return response.data;
  // }
  if(response.data.code===200){
    return response.data.data;
  }else if(response.data.code===403){
    Message.error(response.data.msg);
    Router.push({path: '/login'})
    return response.data.data;
  }else{
    Message.error(response.data.msg);
    return Promise.reject(response.data.msg);
  }
}, function (error) {
  // 对响应错误做点什么
  // Do something with response error
  closeFullScreen();
  let res = error.response
  if (error && res) {
    switch (res.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '重定向'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
    }
    Message({
      message : error.message,
      type : "error"
    });
  }
  return Promise.reject(error);
});


export default instance