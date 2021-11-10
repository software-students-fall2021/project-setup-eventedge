import {useEffect, useState} from 'react';

const usePromiseStates = (initialLoading, initialError, initialData) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [isError, setIsError] = useState(initialError);
  const [data, setData] = useState(initialData);

  return {isLoading, isError, data, setIsLoading, setIsError, setData};
};

export const usePostService = (promise) => {
  const {isLoading, isError, data, setIsLoading, setIsError, setData} =
    usePromiseStates(false, false, null);

  const post = async (args) => {
    try {
      setIsLoading(true);
      const data = await promise(args);
      setData(data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {post, isLoading, isError, data};
};

export const useGetService = (method) => {
  const {isLoading, isError, data, setIsLoading, setIsError, setData} =
    usePromiseStates(true, false, null);

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

  return {isLoading, isError, data, setData};
};
