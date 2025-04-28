import ModeloUsuario from '../modelo/modeloUsuarios.js'; // Asegúrate de la ruta correcta a tu modelo
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const crearUsuario = async (solicitud, respuesta) => {
    // Aquí va tu lógica para crear un nuevo usuario
    try {
        const nuevoUsuario = new ModeloUsuario(solicitud.body);
        await nuevoUsuario.save();
        respuesta.status(201).json({ resultado: 'bien', datos: nuevoUsuario });
    } catch (error) {
        respuesta.status(500).json({ resultado: 'mal', mensaje: 'error al crear usuario', datos: error });
    }
};

const obtenerUsuario = async (solicitud, respuesta) => {
    // Aquí va tu lógica para obtener un usuario por ID
    try {
        const usuario = await ModeloUsuario.findById(solicitud.params.id);
        if (!usuario) {
            return respuesta.status(404).json({ resultado: 'mal', mensaje: 'usuario no encontrado' });
        }
        respuesta.json({ resultado: 'bien', datos: usuario });
    } catch (error) {
        respuesta.status(500).json({ resultado: 'mal', mensaje: 'error al obtener usuario', datos: error });
    }
};

const actualizarUsuario = async (solicitud, respuesta) => {
    // Aquí va tu lógica para actualizar un usuario por ID
    try {
        const usuarioActualizado = await ModeloUsuario.findByIdAndUpdate(solicitud.params.id, solicitud.body, { new: true });
        if (!usuarioActualizado) {
            return respuesta.status(404).json({ resultado: 'mal', mensaje: 'usuario no encontrado' });
        }
        respuesta.json({ resultado: 'bien', datos: usuarioActualizado });
    } catch (error) {
        respuesta.status(500).json({ resultado: 'mal', mensaje: 'error al actualizar usuario', datos: error });
    }
};

const eliminarUsuario = async (solicitud, respuesta) => {
    // Aquí va tu lógica para eliminar un usuario por ID
    try {
        const usuarioEliminado = await ModeloUsuario.findByIdAndDelete(solicitud.params.id);
        if (!usuarioEliminado) {
            return respuesta.status(404).json({ resultado: 'mal', mensaje: 'usuario no encontrado' });
        }
        respuesta.json({ resultado: 'bien', mensaje: 'usuario eliminado' });
    } catch (error) {
        respuesta.status(500).json({ resultado: 'mal', mensaje: 'error al eliminar usuario', datos: error });
    }
};

const iniciarSesion = async (solicitud, respuesta) => {
    const { correo, contrasena } = solicitud.body;

    try {
        const usuario = await ModeloUsuario.findOne({ correo });

        if (!usuario) {
            return respuesta.status(401).json({ mensaje: 'Credenciales inválidas.' });
        }

        const esContrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

        if (esContrasenaValida) {
            const payload = {
                userId: usuario._id,
                correo: usuario.correo,
                nombre: usuario.nombre
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            return respuesta.json({ token });
        } else {
            return respuesta.status(401).json({ mensaje: 'Credenciales inválidas.' });
        }

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return respuesta.status(500).json({ mensaje: 'Error al iniciar sesión.' });
    }
};

const obtenerInfoUsuario = async (solicitud, respuesta) => {
    // Esta función se llama después de que el middleware 'authenticateToken' verifica el token
    // La información del usuario autenticado está disponible en 'solicitud.user'
    try {
        const usuario = await ModeloUsuario.findById(solicitud.user.userId);
        if (!usuario) {
            return respuesta.status(404).json({ resultado: 'mal', mensaje: 'usuario no encontrado' });
        }
        respuesta.json({ resultado: 'bien', datos: usuario });
    } catch (error) {
        respuesta.status(500).json({ resultado: 'mal', mensaje: 'error al obtener información del usuario' });
    }
};

const obtenerTodosUsuarios = async (solicitud, respuesta) => {
    try {
      const usuarios = await ModeloUsuario.find();
      respuesta.json({ resultado: 'bien', datos: usuarios });
    } catch (error) {
      respuesta.status(500).json({ resultado: 'mal', mensaje: 'error al obtener usuarios', datos: error });
    }
};

export default {
    crearUsuario,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    iniciarSesion,
    obtenerInfoUsuario,
    obtenerTodosUsuarios
};