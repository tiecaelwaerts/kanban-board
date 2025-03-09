import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (error) {
      return false
    }
  }

  getToken(): string {
    const loggedUser: string = localStorage.getItem('token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken);
    window.location.assign('/');
  }

  logout() {
    window.location.assign('/');
    localStorage.removeItem('token');
  }
}

export default new AuthService();