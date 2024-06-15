// axiosConfig.js
import Axios from 'axios';

// Crear una instancia de Axios
const axiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Asegúrate de que esta variable de entorno esté correctamente configurada
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Configurar un interceptor para incluir el token en cada solicitud
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtener el token de localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Añadir el token al encabezado
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
