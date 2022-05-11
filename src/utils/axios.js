import axios from 'axios';
import Vue from 'vue'

// 创建一个axios对象
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL
})
// 编写拦截器
request.interceptors.response.use(
  response => {
    window.response = response
    if (response.status === 200 && response.data.code === 200) {
      return response.data
    }
    return Promise.reject(response);
  },
  error => {
    Vue.prototype.$mzToast(
      error.response ? error.response.data.message : '网络连接错误'
    )
    return error
  }
)
export default request