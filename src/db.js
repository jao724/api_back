import mongoose from "mongoose";


const conectardb = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('La variable de entorno MONGO_URI no está definida');
  }

  await mongoose.connect(mongoUri);
  console.log('conectado a la base de datos');
}


export default conectardb;