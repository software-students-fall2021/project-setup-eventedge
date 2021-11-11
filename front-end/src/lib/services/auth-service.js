import {request} from './request-service';
import {usePostService} from './use-service';

const USERNAME = 'username';

class AuthService {
  isUserLoggedIn() {
    return !!localStorage.getItem(USERNAME);
  }

  login(username) {
    return request().withBody({username}).post('/auth/login');
  }

  logout() {
    localStorage.removeItem(USERNAME);
  }

  getUsername() {
    return localStorage.getItem(USERNAME);
  }
}

export const authService = () => new AuthService();
export const useLoginService = {
  useLogin: () => usePostService(authService().login),
};
