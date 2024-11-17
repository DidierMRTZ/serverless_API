const CryptoJS = require("crypto-js")

function dataEncrypt(data,key) {
    const dataEnctypt = CryptoJS.AES.encrypt(data,key).toString()
    return dataEnctypt;
}

// Función para descifrar datos
function dataDecrypt(encryptedData, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}
// Ejemplo de uso
const key = "JSLOVER"; // Clave para el cifrado
const data = "Este es un mensaje secreto"; // Datos a cifrar
;
const datastring = dataEncrypt(data, key)
console.log(datastring)

const datades = dataDecrypt(datastring , key)
console.log(datades)

const {email,password} ={email:'email'}

if (password == {}){
    console.log(email,password)
}
else{
    console.log(email)
}