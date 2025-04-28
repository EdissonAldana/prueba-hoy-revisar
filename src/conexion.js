import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log("¡Conexión exitosa a la base de datos!");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error); // Cambiamos el console.log a console.error para resaltarlo
  });