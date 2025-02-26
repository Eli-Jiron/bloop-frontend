import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Configuración global de Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

// Tipo para representar una solicitud fallida en la cola de reintentos
type FailedRequest = {
  resolve: (value?: unknown) => void; // Función para resolver la promesa
  reject: (reason?: unknown) => void; // Función para rechazar la promesa
  config: AxiosRequestConfig; // Configuración de la solicitud original
};

// Bandera que indica si se está refrescando el token
let isRefreshing = false;
// Cola de solicitudes fallidas durante el refresco
let failedQueue: FailedRequest[] = [];

// Procesa la cola de solicitudes fallidas
const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error); // Rechaza la promesa si hubo un error
    } else {
      resolve(axios(config)); // Reintenta la solicitud original
    }
  });

  failedQueue = []; // Limpia la cola después de procesarla
};

// Interceptor de respuestas para manejar errores de autenticación (401)
axiosInstance.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, la devuelve sin cambios
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean; // Bandera para evitar bucles de reintentos
    };

    // Si el error es 401 (no autorizado) y no se ha reintentado la solicitud
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Si ya se está refrescando el token, encola la solicitud fallida
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      // Marca la solicitud como reintentada y comienza el proceso de refresco
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Intenta refrescar el token
        await axiosInstance.post('/users/login/refresh/');
        // Procesa la cola de solicitudes fallidas con éxito
        processQueue(null);
        // Reintenta la solicitud original con el nuevo token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Si falla el refresco, rechaza todas las solicitudes en la cola
        processQueue(refreshError as AxiosError);
        return Promise.reject(refreshError);
      } finally {
        // Restablece el estado de refresco
        isRefreshing = false;
      }
    }

    // Si el error no es 401, retorna la respuesta original porque necesito los mensajes lmao
    return error.response;
  }
);

export default axiosInstance;
