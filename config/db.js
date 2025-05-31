const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASS;
    const dbName = process.env.DB_NAME;

    const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.9jqkwl0.mongodb.net/${dbName}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString);
    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    throw err;
  }
};

module.exports = connectDB;
