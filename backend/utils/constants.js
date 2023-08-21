module.exports = {
  URL_REGEX: /^https?:\/\/(www\.)?((?!-)[-a-z0-9]+(?<!-)\.){1,63}[a-z0-9]{1,6}([/?]([\w\-.~:/?#[\]@!$&'()*+,;=])*?)?$/i,
  SECRET: 'f7f771efa56911aceec629d56552158b9c750586b7e7a9dba6257a3911c793ca',
  TOKEN_EXPIRES_IN: 3600 * 24 * 7,
};
