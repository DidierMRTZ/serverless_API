const CryptoJS = require("crypto-js")
const AWS = require("aws-sdk")

function dataEncrypt(data,key) {
  const dataEnctypt = CryptoJS.AES.encrypt(data,key).toString()
  return dataEnctypt;
}

exports.register= async (event) => {
  try {
    let {email,name,password} = JSON.parse(event.body)
    const createdAT = new Date()
    const key = "JSLOVER"; // Clave para el cifrado
    // Configurar el cliente DynamoDB
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    if (!password || password.trim() === ""){
      return {
        statusCode: 403,
        body: JSON.stringify({
          message: "Password Requerid"
        }),
      };
    }
    else{
      password= dataEncrypt(password,key)
      // Insertar un elemento en DynamoDB
      const params = {
        TableName: 'usersTable',
        Item: {
          email, // Clave primaria
          name,
          password,
        },
      };
      await dynamoDB.put(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify({
          email: email,
          name: name,
          password: password // Clave cifrada
        }),
      };
    }
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error"
      }),
    };
  }
};

