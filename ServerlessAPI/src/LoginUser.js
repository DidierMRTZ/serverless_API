const CryptoJS = require("crypto-js")
const AWS = require("aws-sdk")
const JWT = require("jsonwebtoken")

// Función para descifrar datos
function dataDecrypt(encryptedData, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

exports.login= async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const key = "JSLOVER"; // Clave para el cifrado
  let {email,password} = JSON.parse(event.body)
  try {
    const tableName = "usersTable"; // Cambia esto al nombre de tu tabla
    // Obtener el parámetro email de la consulta
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "El email es requerido" }),
      };
    }
    // Item encontrado crear consulta
    const result = await dynamoDB.get({
      TableName: tableName,
      Key: {email}
      }).promise();
    
    if (result.Item) {
      // Item encontrado
      const passwordDecrypt = dataDecrypt(result.Item.password,key)
      // Si las contraseñas coinciden
      if (passwordDecrypt == password){
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Consulta exitosa token JWD",
            data: result.Item,
            password: password,
            password2: passwordDecrypt
          }),
        };
      }
      else{
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "Contraseña incorrecta",
            data: result.Item,
          }),
        };
      }
    } else {
      // Item no encontrado
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "Unauthorized",
          data: result.Item,
        }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error en la consulta", error }),
    };
  }
};
