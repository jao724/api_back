import dotenv from 'dotenv';
import  app  from "./app.js";
import  conectardb  from "./db.js";

dotenv.config();

const port = process.env.PORT || 3000;

conectardb()



app.listen(port, () => {
  console.log(`escuchando en el puerto: ${port} ` + `http://localhost:3000`);
  
})