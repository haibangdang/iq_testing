export default {
  meEndpoint: '/auth/me',
  loginEndpoint: 'https://iqtest-server.onrender.com/api/users/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
