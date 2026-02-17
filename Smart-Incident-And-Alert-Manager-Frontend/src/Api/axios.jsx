import axios from "axios"

const api = axios.create({
  baseURL: "http://13.232.102.44:8080",
})

export default api
