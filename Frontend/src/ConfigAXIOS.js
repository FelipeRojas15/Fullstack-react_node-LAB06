import axios from 'axios';

const iAx = axios.create({
    baseURL: 'http://localhost:2000',
    headers: {
        'Content-Type': 'application/json'
    }
});

iAx.interceptors.request.use(
    (config) => {
      // Aquí puedes añadir lógica antes de enviar la solicitud
      // Por ejemplo, añadir tokens de autenticación a los encabezados
      // config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      // Maneja errores en la solicitud
      return Promise.reject(error);
    }
  );
  
  iAx.interceptors.response.use(
    (response) => {
        console.log(response);

      // Aquí puedes manejar la respuesta antes de que llegue al componente
      return response;
    },
    (error) => {
      // Maneja errores en la respuesta
      return Promise.reject(error);
    }
  );


export default iAx;