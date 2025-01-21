import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000,
})
http.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers.authorization = 'Bearer ' + accessToken
    }
    // 在发送请求之前做些什么
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
http.interceptors.response.use(
  response => {
    return response.data
  },
  async error => {
    const { status, response } = error
    const errors = [400, 401]
    if (errors.includes(status)) ElMessage.error(response.data.data)
    return error.response
  },
)
