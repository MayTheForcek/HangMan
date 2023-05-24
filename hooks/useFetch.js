import { useEffect, useState } from 'react';

import axios from 'axios';

const useFetch = wordLength => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const options = {
    method: 'GET',
    url: `https://random-word-api.vercel.app/api?words=1&length=${wordLength}`,
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data[0]);
      setIsLoading(false);
      setFinished(true);
    } catch (error) {
      alert('There is an error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, finished, isLoading };
};

export default useFetch;
