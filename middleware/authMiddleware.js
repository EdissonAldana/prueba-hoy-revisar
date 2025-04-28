
import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SECRET;


const authenticateToken = (laSolicitud, laRespuesta, continuar) => {
  
  const laCabezaConLlave = laSolicitud.headers['authorization'];
  
  const laLlave = laCabezaConLlave && laCabezaConLlave.split(' ')[1];

  
  if (laLlave == null) {
    return laRespuesta.status(401).json({ mensaje: '¡Oye! Necesitas una llave para entrar.' });
  }

  // Ahora, vamos a verificar si la llave es válida usando nuestra contraseña secreta
  jwt.verify(laLlave, secretKey, (error, elUsuarioDeLaLlave) => {
    // Si la llave no es válida (está rota o es falsa), ¡no puedes pasar!
    if (error) {
      console.error('La llave no es válida:', error);
      return laRespuesta.status(403).json({ mensaje: '¡Esta llave no funciona!' });
    }

    // Si la llave es buena, guardamos la información del usuario de la llave en la solicitud
    laSolicitud.user = elUsuarioDeLaLlave;
    // ¡Ahora puedes continuar al siguiente piso (la ruta protegida)!
    continuar();
  });
};

// Exportamos a nuestro portero para que pueda trabajar en el edificio
export default authenticateToken;