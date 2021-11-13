import {request} from './request-service';
import {usePostService} from './use-service';
import {parseJwt} from '../utils/parse-jwt';

const EVENTEDGE_AUTH = 'EVENTEDGE_AUTH';

class AuthService {
  getAuthData() {
    const data = localStorage.getItem(EVENTEDGE_AUTH);

    return data ? JSON.parse(data) : null;
  }

  isTokenExpired() {
    try {
      const parsedToken = parseJwt(this.getAuthData()?.token);

      return Date.now().valueOf() / 1000 > parsedToken.exp;
    } catch (e) {
      return true;
    }
  }

  isUserLoggedIn() {
    return !!this.getAuthData();
  }

  async login(loginData) {
    const {username, token} = await request()
      .withBody(loginData)
      .post('/auth/login');

    localStorage.setItem(EVENTEDGE_AUTH, JSON.stringify({username, token}));
  }

  async register(registerData) {
    const {username, token} = await request()
      .withBody(registerData)
      .post('/auth/register');

    localStorage.setItem(EVENTEDGE_AUTH, JSON.stringify({username, token}));
  }

  logout() {
    localStorage.removeItem(EVENTEDGE_AUTH);
  }

  getUsername() {
    return this.getAuthData()?.username;
  }
}

export const authService = () => new AuthService();

export const useAuthService = {
  useLogin: () => usePostService(authService().login),
  useRegister: () => usePostService(authService().register),
};
