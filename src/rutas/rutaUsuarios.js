import { Router } from 'express';
import ControladorUsuarios from '../controlador/ControladorUsuarios.js';
import authenticateToken from '../../middleware/authMiddleware.js'; // Asegúrate de la ruta y extensión

const enrutadorUsuarios = Router();

// Ruta para crear un nuevo usuario (POST)
enrutadorUsuarios.post('/', ControladorUsuarios.crearUsuario);

// Ruta para obtener un usuario por su ID (GET)
enrutadorUsuarios.get('/:id', ControladorUsuarios.obtenerUsuario);

// Ruta para actualizar un usuario por su ID (PUT)
enrutadorUsuarios.put('/:id', ControladorUsuarios.actualizarUsuario);

// Ruta para eliminar un usuario por su ID (DELETE)
enrutadorUsuarios.delete('/:id', ControladorUsuarios.eliminarUsuario);

// Ruta para iniciar sesión (POST)
enrutadorUsuarios.post('/login', ControladorUsuarios.iniciarSesion);

// Ruta protegida para obtener información del usuario (GET)
enrutadorUsuarios.get('/me', authenticateToken, ControladorUsuarios.obtenerInfoUsuario);

enrutadorUsuarios.get('/', ControladorUsuarios.obtenerTodosUsuarios);

enrutadorUsuarios.get('/prueba', (req, res) => {
  res.send('¡Ruta de prueba funcionando!');
});

export default enrutadorUsuarios;