import express, { urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import colors from "colors";
import * as dotenv from "dotenv";
import router from "./routes/testRoute.js";
import productsRouter from "./routes/productsRoute.js";
import booksRoute from "./routes/booksRoute.js";
import UserRouter from "./routes/userRoute.js";
import testRouter from "./routes/testRoute.js";

dotenv.config();
const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  // app.use(urlencoded({ extended: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};

const startServer = () => {
  const port = process.env.port || 5000;
  app.listen(port, () => {
    console.log("server is running on Por", port);
  });
};

const loadRoots = () => {
  // Test
  app.use("/api", router);

  // Products
  app.use("/api/products", productsRouter);

  // books
  app.use("/api/books", booksRoute);

  //  Users
  app.use("/auth", UserRouter);

  // Wrong Url Validation
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Endpoint doesn't exist" });
  });

  //  Test Route

  app.use("/api", testRouter);
};

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected".bgBlue);
  } catch (error) {
    console.log("Something went wrong".bgRed);
  }
};

//LIFE
(async function controller() {
  await DBConnection();
  addMiddlewares();
  loadRoots();
  startServer();
})();
