require("dotenv").config();
const cors = require("cors");
const express = require("express");
const clc = require("cli-color");

const connectDB = require("./configs/db");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use("/api/auth", authRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  if (process.env.NODE_ENV == "production") process.stdout.write(clc.reset);
  console.log(
    clc.black.bgGreenBright(
      `Server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode.`
    )
  );
  connectDB();
});
