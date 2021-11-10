import { request } from "./request-service";
import { usePostService } from "./use-service";


const USERNAME = 'username';

class AuthService {
  isUserLoggedIn() {
    return !!localStorage.getItem(USERNAME);
  }

  login(username) {
    const {isLoading, isError, data} = usePostService(() => request().withBody({username}).post('/auth/login'))
    if (!isError) localStorage.setItem(USERNAME, username);
    else return "login failed"
  }

  logout() {
    localStorage.removeItem(USERNAME);
  }

  getUsername() {
    return localStorage.getItem(USERNAME);
  }
}

export const authService = () => new AuthService();
