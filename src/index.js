import dotenv from 'dotenv';
import  app  from "./app.js";
import  conectardb  from "./db.js";

dotenv.config();

const port = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await conectardb();

    app.listen(port, () => {
      console.log(`🚀 Escuchando en el puerto: ${port} ` + `http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ No se pudo iniciar el servidor por un error de conexión con MySQL:', error);
    process.exitCode = 1;
  }
};

await iniciarServidor();
