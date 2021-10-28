import {useEffect, useState} from 'react';

export const useService = (method) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(async () => {
    try {
      const data = await method();
      setIsLoading(false);
      setData(data);
    } catch (e) {
      console.log(e, 'Error');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {isLoading, isError, data};
};
