import {request} from './request-service';
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

  async login(loginData) {
    const {username, token} = await request()
      .withBody(loginData)
      .post('/auth/login');

    localStorage.setItem(EVENTEDGE_AUTH, JSON.stringify({username, token}));

    return {username, token};
  }

  async register(registerData) {
    const {username, token} = await request()
      .withBody(registerData)
      .post('/auth/register');

    localStorage.setItem(EVENTEDGE_AUTH, JSON.stringify({username, token}));

    return {username, token};
  }

  logout() {
    localStorage.removeItem(EVENTEDGE_AUTH);
  }
}

export const authService = () => new AuthService();

// need to include this auth header in every protected request
// in order for the request to be authenticated
export const getAuthHeader = () => {
  const bearerToken = authService().getAuthData()?.token;

  return {Authorization: `Bearer ${bearerToken}`};
};
