require("dotenv").config();
const express = require("express");
const app = express();
const DB = require("./Database/db");

// Importing Routes
const userRouter = require("./Routes/user.routes");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/api", userRouter);

DB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening to the PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
