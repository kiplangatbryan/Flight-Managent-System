
const mongoose = require("mongoose");


if (process.env.PORT != undefined) {
  process.env.NODE_ENV = "";
} else {
  process.env.NODE_ENV = "development";
}

exports.db = async () => {
  let url;

  if (process.env.NODE_ENV == "development") {
    url = process.env.MONGODB_URL_DEV;
  } else {
    url = process.env.MONGODB_URL_PROD;
  }

  mongoose
    .connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      logger: true,
      poolSize: 50,
      connectTimeoutMS: 2500,
    })
    .then(() => {
      console.log(`db connection ${mongoose.connection.name} successfully`.yellow);
    })
    .catch((err) => {
      console.error(`could not connect due to ${err}`.red);
      process.exit(1);
    });

  const dbConnection = mongoose.connection;

  dbConnection.on("error", (err) => {
    console.log(`${err} occurred while starting db`);
  });

  dbConnection.once("open", (err) => {
    if (err) {
      console.log("error in connecting to the Database");
    }
  });
};
