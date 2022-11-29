import {request} from './request-service';
import {useGetService} from './use-service';
import {getAuthHeader} from './auth-service';

export function usersService() {
  return {
    getAllUsers() {
      return request().withHeader(getAuthHeader()).get('/users');
    },
  };
}

export const useUsersService = {
  useAllUsers: () => useGetService(usersService().getAllUsers),
};
