import Axios from 'axios';

// Crear una instancia de Axios
const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Asegúrate de que esta variable de entorno esté correctamente configurada
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Habilitar el envío de cookies y credenciales
});

// Obtener el token CSRF antes de hacer cualquier solicitud autenticada
axios.get('/sanctum/csrf-cookie').then(response => {
    console.log('CSRF cookie set');
}).catch(error => {
    console.error('Error setting CSRF cookie:', error);
});

export default axios;
