export default {
  async setToken(token) {
    if (token) {
      localStorage.setItem('token', token); // Save token to localStorage
    }
  },

  logout() {
    localStorage.removeItem('token'); // Remove token on logout
  },

  getToken() {
    return localStorage.getItem('token'); // Retrieve token
  },

  isAuthenticated() {
    return !!localStorage.getItem('token'); // Check if user is authenticated
  }
};