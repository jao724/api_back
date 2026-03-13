import mongoose from "mongoose";


const conectardb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('conectado a la base de datos');

  } catch (error) {
    console.log('error  al conectar la base de datos', error);
  }
}


export default conectardb;