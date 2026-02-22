import axios from "axios"
import toast from "react-hot-toast"

// AXIOs is a popular JavaScript library used to make HTTP requests generally used in React applications to communicate with backend.
// Created an axios instance with the base URL of the backend API. This allows us to easily make requests to the API without having to specify the full URL each time.
const api = axios.create({
  baseURL: "http://13.232.102.44:8080",
})

// It is an interceptor which automatically intercepts every outgoing request and adds the authentication token (if available in local storage) to the requuest headers. This ensures that all requests to the backend API are authenticated without having to manually add the token to each request.
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


// This interceptor is used to handle unauthorized responses from the backend it automatically intercepts every response and looks for a 401 status code if it is detected it removes the old authentication token and redirects the user to login page to reauthenticate. This ensures that users are prompted to log in again if their session has expired or if they are unauthorized to access certain resources.
api.interceptors.response.use(
  (response) => {
    return response },
  (error) => {
    if (error.response || error.response.status === 401) {
      localStorage.removeItem("authToken")
      toast.error("Session expired. Please log in again.")
      window.location.href = "auth/login"
    }
    return Promise.reject(error)
  }
) 

export default api
