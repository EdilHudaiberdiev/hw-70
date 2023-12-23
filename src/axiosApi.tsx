import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://hw-70-5f94f-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;