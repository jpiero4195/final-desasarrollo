//crear archivo para la configuración de la base de datos
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB', error);
    process.exit(1);
  }
};
export default connectDB;