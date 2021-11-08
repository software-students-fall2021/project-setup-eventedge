const USERNAME = 'username';

class AuthService {
  isUserLoggedIn() {
    return !!localStorage.getItem(USERNAME);
  }

  login(username) {
    localStorage.setItem(USERNAME, username);
  }

  logout() {
    localStorage.removeItem(USERNAME);
  }

  getUsername() {
    return localStorage.getItem(USERNAME);
  }
}

export const authService = () => new AuthService();
