const JWT = require("jsonwebtoken")
const credentials = require('./credentials.js')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMyIsInBhc3N3b3JkIjoiMTIzIiwiaWF0IjoxNzMxODg1MDY0LCJleHAiOjE3MzE4ODUxMjR9.oMCtK8j2rF4QpsduGieU7FibrM7yITS9QO6I_DERyAA'


  

try {
      data = JWT.verify(token,credentials.SECRET_JWT_KEY);
      console.log('Token válido:');
    ;
  } catch (error) {
    console.error('Token inválido o expirado:');
  }
