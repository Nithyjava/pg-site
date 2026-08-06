import axios, { InternalAxiosRequestConfig } from 'axios';

let memoryToken: string | null =  localStorage.getItem('accessToken');
console.log("Initial memoryToken:", memoryToken);
// Client state storage

const api = axios.create({
  baseURL: 'http://localhost:4000/api/',
  withCredentials: true, // Forces cookies to automatically attach to cross-origin requests
});

// Inject Access Token to every outgoing request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const test = localStorage.getItem('accessToken');
    console.log("Request Interceptor - LocalStorage Access Token:", test);
  if (memoryToken) {
    config.headers.Authorization = `Bearer ${memoryToken}`;
  }
  return config;
});

// Auto-Refresh access token seamlessly on HTTP 401 statuses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Triggers backend refreshSession() controller to verify the httpOnly cookie
        const res = await axios.post('http://localhost:4000/api/auth/refresh', {}, { withCredentials: true });
        memoryToken = res.data.accessToken;
        
        originalRequest.headers.Authorization = `Bearer ${memoryToken}`;
        return api(originalRequest); // Re-execute failed initial network call
      } catch (refreshError) {
        memoryToken = null;
        window.location.href = '/login'; // Handle full session death
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default api;