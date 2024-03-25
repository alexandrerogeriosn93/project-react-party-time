const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(
      "mongodb+srv://alexandrerogeriosn93:SGXalyef3ZLBFpri@cluster0.x60ufy2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Conectado ao banco");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;
