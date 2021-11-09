import {request} from './request-service';
import {useGetService} from './use-service';

export function usersService() {
  return {
    getAllUsers() {
      return request().get('/users');
    },
  };
}

export const useUsersService = {
  useAllUsers: () => useGetService(usersService().getAllUsers),
};
