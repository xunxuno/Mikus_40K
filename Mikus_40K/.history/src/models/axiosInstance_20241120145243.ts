import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3002', // URL base para el backend
    withCredentials: true, // Permite enviar cookies automáticamente
});

// Agrega un interceptor para incluir el token de autorización
axiosInstance.interceptors.request.use((config) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('session_token='))
        ?.split('=')[1];

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
