const CryptoJS = require("crypto-js")
const AWS = require("aws-sdk")
const JWT = require("jsonwebtoken")
const credentials = require('./credentials.js')

exports.getuser = async (event) => {
  const token = 'sadsad'
  try {
    data = JWT.verify(token,credentials.SECRET_JWT_KEY);
    console.log('Token válido:', data,token);
      }
  catch{
    console.log('Token válido:');
  }
}