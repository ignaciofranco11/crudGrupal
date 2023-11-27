const jwt = require('jsonwebtoken');

// Clave secreta para firmar y verificar el token (cámbiala en un entorno de producción)
const SECRET_KEY = 'mi_clave_secreta';

// Función para generar un token
function generarToken() {
    // Definir la información del token
    const payload = {
        sub: '1234567890',
        name: 'John Doe',
        iat: Math.floor(Date.now() / 1000),       // Tiempo de emisión (marca de tiempo actual en segundos)
        exp: Math.floor(Date.now() / 1000) + 3600 // Expira después de 1 hora (3600 segundos)
    };

    // Generar el token con la información y la clave secreta
    const token = jwt.sign(payload, SECRET_KEY);
    return token;
}

// Función para validar un token
function validarToken(token) {
    try {
        // Verificar el token usando la clave secreta
        const payload = jwt.verify(token, SECRET_KEY);
        console.log("Token válido. Información del usuario:", payload);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.log("Error: Token ha expirado.");
        } else {
            console.log("Error: Token no válido.");
        }
    }
}

// Generar un token
const tokenGenerado = generarToken();
console.log("Token generado:", tokenGenerado);

// Validar el token
validarToken(tokenGenerado);
