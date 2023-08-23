const {
  PORT =  3000,
  DB_CONNECTION = 'mongodb://127.0.0.1:27017/mesto',
  SECRET = 'VERY-VERY-TOP-SECRET-STRING',
  TOKEN_EXPIRES_IN = 604800,
  CORS_ALLOW_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE",
  CORS_ALLOW_ORIGIN = '*'
} = process.env;

module.exports = {
  URL_REGEX: /^https?:\/\/(www\.)?((?!-)[-a-z0-9]+(?<!-)\.){1,63}[a-z0-9]{1,6}([/?]([\w\-.~:/?#[\]@!$&'()*+,;=])*?)?$/i,
  PORT,
  DB_CONNECTION,
  SECRET,
  TOKEN_EXPIRES_IN,
  CORS_ALLOW_METHODS,
  CORS_ALLOW_ORIGIN: CORS_ALLOW_ORIGIN.split(', '),
  LIMITER: { windowMs: 15 * 60 * 1000, max: 100}
}