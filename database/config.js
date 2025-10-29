import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("base de datos online");
  } catch (error) {
    throw new Error("Error a la hora de iniciar la basa de datos");
  }
};

export default dbConnection;
