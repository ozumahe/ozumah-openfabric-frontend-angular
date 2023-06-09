import axios from 'axios';
import type { Method, AxiosResponse } from 'axios';

axios.defaults.baseURL =
  'https://ozumah-backend-openfabric-test.onrender.com/api/v1';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const apiCall = async (
  method: Method,
  url: string,
  data?: {}
): Promise<AxiosResponse> =>
  await axios({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

export default apiCall;
