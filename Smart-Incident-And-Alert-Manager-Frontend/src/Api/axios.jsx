import axios from "axios"

const api = axios.create({
  baseURL: "http://13.232.102.44:8080",
})

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken") 
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    } 
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "auth/login"
    }
    return Promise.reject(error)
  }
) 

export default api
