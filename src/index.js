import "dotenv/config";
import "./conexion.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import enrutadorUsuarios from "./rutas/rutaUsuarios.js";

const servidor = express();

servidor.use(cors());
servidor.use(morgan("dev"));
servidor.use(express.json());
servidor.use('/api/usuarios', enrutadorUsuarios);

servidor.get('/', (solicitud, respuesta) => {
  respuesta.status(404).send("No encontrado");
});

servidor.listen(3000, () => {
  console.log("El servidor se esta escuchando en el link http://localhost:3000");
});

export default servidor;