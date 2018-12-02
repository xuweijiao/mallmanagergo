// 插件模块
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
  // 设置基准路径
  axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
// 在发请求之前会先来到下面的回调
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 如果请求不是login设置token
    // 如果我们设置了baseUrl,url会自动截取我们请求的标识
    if (config.url !=='login') {
       const token = localStorage.getItem("token");
       config.headers["Authorization"] = token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}
export default MyHttpServer
