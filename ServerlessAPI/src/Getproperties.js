const CryptoJS = require("crypto-js")
const AWS = require("aws-sdk")
const JWT = require("jsonwebtoken")
const credentials = require('./credentials.js')

exports.properties= async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const tableName = "propertiesTable"
    try {
        // Traer todas las propiedades
        const result = await dynamoDB.scan({
            TableName: tableName
            }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({message:result}),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message:  "Internal Server Error",error}),
        };
    }
}