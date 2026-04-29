import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error(`Make sure your MONGO_URI in Render is pointing to a Cloud Database (like MongoDB Atlas) and NOT localhost!`);
    // process.exit(1); // Do not exit, so the server stays alive to return proper error messages
  }
};

export default connectDB;
