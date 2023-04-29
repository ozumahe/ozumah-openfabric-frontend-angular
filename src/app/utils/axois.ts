import axios from 'axios';
import type { Method, AxiosResponse } from 'axios';

axios.defaults.baseURL = '';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const apiCall = async (
  method: Method,
  url: string,
  data?: {}
): Promise<AxiosResponse> => await axios({ method, url, data });

export default apiCall;
