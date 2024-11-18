const CryptoJS = require("crypto-js")
const AWS = require("aws-sdk")
const JWT = require("jsonwebtoken")
const credentials = require('./credentials.js')
const { v4: uuidv4 } = require('uuid')

exports.properties= async (event) => {
    const token = event.headers.authorization.split(' ')[1];
    let {name,price} = JSON.parse(event.body)
    const tableName = "propertiesTable"
    const id = uuidv4()
    // Configurar el cliente DynamoDB
    try {
        data = JWT.verify(token,credentials.SECRET_JWT_KEY);
        try {
            const dynamoDB = new AWS.DynamoDB.DocumentClient();
            // Insertar un elemento en DynamoDB
            const params = {
                TableName: tableName ,
                Item: {
                id, // Clave primaria
                name,
                price,
                },
            };
            await dynamoDB.put(params).promise();
            return {
                statusCode: 200,
                body: JSON.stringify({ id: id, name: name, price: price }),
            };
        } catch (error) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Error en DB',error}),
            };
            
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Token inválido o expirado:'}),
        };
    }
}