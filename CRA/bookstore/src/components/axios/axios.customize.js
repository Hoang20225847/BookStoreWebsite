import axios from "axios";

// Tạo instance riêng
const instance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    "Content-Type": "application/json"
  }
});

// Gắn access token trước khi gửi request
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(function(response){
  if(response && response.data) return response.data;
  return response;
},function(error){
  return Promise.reject(error)
  
})

export default instance;