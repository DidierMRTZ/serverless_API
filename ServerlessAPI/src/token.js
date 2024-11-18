const JWT = require("jsonwebtoken")
const credentials = require('./credentials.js')
const token = JWT.sign({email:'123',password:'123'},credentials.SECRET_JWT_KEY,{ expiresIn: '1m'})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

try {
    sleep(1).then(() => {
        data = JWT.verify(token,credentials.SECRET_JWT_KEY);
        console.log('Token válido:', data,token);
      });
  } catch (error) {
    console.error('Token inválido o expirado:');
  }
